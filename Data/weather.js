const axios = require('axios');
const fs = require('fs');
const path = require('path');
const webhdfs = require('webhdfs');

const hdfs = webhdfs.createClient({
    user: 'hdfs',
    host: '172.20.0.5',
    port: 9870,
    path: '/webhdfs/v1',
});

const uploadToHDFS = (localFilePath, hdfsFileName) => {
    return new Promise((resolve, reject) => {
        const localFileStream = fs.createReadStream(localFilePath);
        const hdfsWriteStream = hdfs.createWriteStream(`/user/root/${hdfsFileName}`);

        localFileStream.pipe(hdfsWriteStream);

        hdfsWriteStream.on('finish', () => {
            console.log(`File ${hdfsFileName} uploaded to HDFS`);
            resolve();
        });

        hdfsWriteStream.on('error', (err) => {
            console.error(`Upload error: ${hdfsFileName}:`, err.message);
            reject(err);

            if (err.response) {
                console.error("Error response:", err.response);
            } else {
                console.error("Unknown error details:", err);
            }
        });
    });
};


function normalizeLocation(location) {
    const removeDiacritics = location.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return removeDiacritics.replace(/\s+/g, "");
}

const readCoordinates = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const lines = data.trim().split('\n');
        return lines.map(line => {
            const [latitude, longitude, location] = line.split(',').map(item => item.trim());
            return { latitude: parseFloat(latitude), longitude: parseFloat(longitude), location };
        });
    } catch (error) {
        console.error('Read coordinates fail:', error.message);
        return [];
    }
};

function removeMetaData(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const lines = data.split('\n');

        if (lines.length <= 27) {
            return;
        }
        const filteredLines = lines.slice(16).join('\n');
        fs.writeFileSync(filePath, filteredLines, 'utf8');

        console.log(`Overwrited: ${filePath}`);
    } catch (error) {
        console.error(`Overwrite erorr, File : ${filePath}:`, error.message);
    }
}

const fetchWeatherDataForLocation = async (latitude, longitude, location, startYear, endYear) => {
    const baseUrl = 'https://power.larc.nasa.gov/api/temporal/hourly/point';
    const community = 'RE';
    const parameters = 'T2M,RH2M,WS10M,WD10M,ALLSKY_SFC_SW_DWN,PS,ALLSKY_SFC_UV_INDEX,PRECTOTCORR';
    const format = 'CSV';
    const theme = 'light';
    const user = 'DAVE';

    for (let year = startYear; year <= endYear; year++) {
        const start = `${year}0101`;
        const end = `${year === 2025 ? '20250101' : `${year}1231`}`;
        const url = `${baseUrl}?start=${start}&end=${end}&latitude=${latitude}&longitude=${longitude}&community=${community}&parameters=${parameters}&format=${format}&theme=${theme}&user=${user}`;

        console.log(`Crawling  ${year}'s data for ${location}...`);

        try {
            const response = await axios.get(url, { responseType: 'text' });

            if (response.headers['content-type'].includes('text/csv')) {
                const fileName = `weather_data_${location}_${year}.csv`;
                const filePath = path.join(__dirname, fileName);

                fs.writeFileSync(filePath, response.data, 'utf8');
                console.log(`Data year ${year} saved to ${filePath}`);
                removeMetaData(filePath);
                console.log('\n');
                uploadToHDFS(filePath,fileName);
            } else {
                console.error(`API not respone CSV ${location} year ${year}`);
            }
        } catch (error) {
            console.error(`Fail when crawn ${year} for ${location}:`, error.message);
        }
    }
};

const processWeatherData = async (startYear, endYear, coordinatesFilePath) => {
    try {
        const coordinates = readCoordinates(coordinatesFilePath);

        if (coordinates.length > 0) {
            const batchSize = 21;

            for (let i = 0; i < coordinates.length; i += batchSize) {
                const batch = coordinates.slice(i, i + batchSize);
                const promises = batch.map(({ latitude, longitude, location }) =>
                    fetchWeatherDataForLocation(latitude, longitude, location, startYear, endYear)
                );

                await Promise.all(promises);
            }

            console.log('Done');
        } else {
            console.error('Coordinate not found');
        }
    } catch (error) {
        console.error('General', error.message);
    }
};

const coordinatesFilePath = path.join(__dirname, 'vietnamgridprovinceNormal.txt');

processWeatherData(2024, 2024, coordinatesFilePath);
