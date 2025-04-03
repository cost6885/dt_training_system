from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)

# PostgreSQL URI 설정 (환경 변수나 직접 설정)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://dt:dt_password@localhost/mydatabase'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# SQLAlchemy 객체 생성
db = SQLAlchemy(app)

# 예시 모델 (PostgreSQL 데이터베이스에 테이블을 생성하고 사용할 수 있습니다)
class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    position = db.Column(db.String(100))
    salary = db.Column(db.Float)  # salary 필드를 추가 (필요에 따라 제거 가능)

# 초기 데이터 삽입
def insert_initial_data():
    if Employee.query.count() == 0:  # 데이터가 없을 때만 삽입
        employees = [
            Employee(name="김상우", position="영업기획팀"),
            Employee(name="서민표", position="안양지점"),
            Employee(name="오민석", position="영업기획팀"),
            Employee(name="이병찬", position="자사몰사업팀"),
            Employee(name="전진", position="이커머스기획팀"),
            Employee(name="정태양", position="상품유통기획팀"),
            Employee(name="조시묵", position="강서지점"),
            Employee(name="조정찬", position="영업지원팀"),
            Employee(name="김관수", position="포장개발팀"),
            Employee(name="박재한", position="식품안전연구팀"),
            Employee(name="손병욱", position="기능식품개발팀"),
            Employee(name="손지민", position="R&D기획팀"),
            Employee(name="이윤형", position="식품안전팀"),
            Employee(name="하만호", position="품질보증팀"),
            Employee(name="김경순", position="글로벌마케팅TF팀"),
            Employee(name="고재규", position="안성환경공무팀"),
            Employee(name="곽래환", position="안성환경공무팀"),
            Employee(name="권형우", position="구미품질관리팀"),
            Employee(name="박성운", position="구미생산2팀"),
            Employee(name="손준기", position="아산환경공무팀"),
            Employee(name="이준", position="아산생산1팀"),
            Employee(name="장진호", position="구미품질관리팀"),
            Employee(name="조성휘", position="아산생산2팀"),
            Employee(name="김병묵", position="SCM팀"),
            Employee(name="박준식", position="구매1팀"),
            Employee(name="박지혜", position="구매3팀"),
            Employee(name="이원준", position="디지털전략팀"),
            Employee(name="장동성", position="법무팀"),
            Employee(name="홍지현", position="법무팀"),
            Employee(name="임지수", position="성장전략팀")
        ]
        db.session.add_all(employees)
        db.session.commit()

@app.route('/add_employee', methods=['POST'])
def add_employee():
    data = request.get_json()  # JSON 형태로 데이터 받기
    new_employee = Employee(
        name=data['name'], 
        position=data['position'], 
        salary=data.get('salary')  # 'salary' 필드를 optional하게 받기 (없으면 None으로 처리)
    )
    db.session.add(new_employee)
    db.session.commit()
    return jsonify({'message': 'Employee added successfully!'}), 201

@app.before_first_request
def initialize_data():
    insert_initial_data()  # 앱 시작 시 초기 데이터 삽입

# 기본 라우트
@app.route('/')
def index():
    return "Connected to the PostgreSQL database!"

if __name__ == '__main__':

    # 데이터베이스 연결을 확인하고, 테이블을 생성할 수 있습니다.
    with app.app_context():
        db.create_all()  # 테이블 생성
    app.run(host='0.0.0.0', port=5000, debug=True)
