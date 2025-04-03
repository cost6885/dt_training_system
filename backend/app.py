from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)

# 데이터베이스 URI 설정 (SQLite로 설정)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///employee_training.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # SQLAlchemy의 변경 추적을 끔

# CORS 설정 (프론트엔드와의 크로스 도메인 요청을 허용)
CORS(app)

# 데이터베이스 객체 생성
db = SQLAlchemy(app)

# 모델 임포트
from models import Employee, Task, TrainingCompletion, TrainingType

# 테이블 생성 (이 작업은 앱을 처음 실행할 때만 필요)
with app.app_context():
    db.create_all()  # 테이블 생성

@app.route('/')
def index():
    return 'Welcome to the DT Training System!'

if __name__ == '__main__':
    app.run(debug=True)
