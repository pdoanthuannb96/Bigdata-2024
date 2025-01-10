from airflow import DAG
from airflow.providers.docker.operators.docker import DockerOperator
from datetime import datetime

# Định nghĩa các thông tin cơ bản của DAG
dag = DAG(
    'spark_data_processing',
    description='DAG to get data from ubuntuY and process it with Spark on spark-master',
    schedule_interval='0 12 * * *',  # Chạy thủ công (có thể thay đổi theo lịch trình)
    start_date=datetime(2025, 1, 11),
    catchup=False,
)

# Lệnh để lấy dữ liệu từ ubuntuY
get_data_from_ubuntuY = DockerOperator(
    task_id='get_data_from_ubuntuY',
    image='ubuntu:latest',  # Sử dụng image của container ubuntuY
    command='cd /mnt/CollectData && npm start',  # Lệnh để lấy dữ liệu
    docker_url='unix://var/run/docker.sock',  # Đảm bảo DockerOperator kết nối đúng với Docker socket
    network_mode='bigdataproject_default',  # Kết nối vào mạng bigdataproject_default
    auto_remove=True,
    dag=dag,
)

# Lệnh để xử lý dữ liệu với Spark trên spark-master
process_data_with_spark = DockerOperator(
    task_id='process_data_with_spark',
    image='spark:latest',  # Sử dụng image của container spark-master
    command='spark-submit --master spark://spark-master:7077 /shared_data/spark_job.py',  # Lệnh để xử lý dữ liệu
    docker_url='unix://var/run/docker.sock',  # Đảm bảo DockerOperator kết nối đúng với Docker socket
    network_mode='bigdataproject_default',  # Kết nối vào mạng bigdataproject_default
    auto_remove=True,
    dag=dag,
)

# Định nghĩa thứ tự các task
get_data_from_ubuntuY >> process_data_with_spark
