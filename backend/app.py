from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)

# 환경 변수로부터 DB URI 가져오기
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///employee_training.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# CORS 설정 (프론트엔드와의 크로스 도메인 요청을 허용)
CORS(app)

# 데이터베이스 설정
db = SQLAlchemy(app)

# 모델 임포트 (이제 모델을 여기서만 임포트)
from models import Employee, Task, TrainingCompletion, TrainingType

@app.route('/')
def index():
    return 'Welcome to the DT Training System!'

if __name__ == '__main__':
    app.run(debug=True)
