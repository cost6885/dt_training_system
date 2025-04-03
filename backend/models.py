from app import db

class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    department = db.Column(db.String(50), nullable=False)
    position = db.Column(db.String(50), nullable=False)
    training_records = db.relationship('TrainingCompletion', backref='employee', lazy=True)
    tasks = db.relationship('Task', backref='employee', lazy=True)

class TrainingType(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)  # 교육 종류

class TrainingCompletion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    hours = db.Column(db.Integer)
    status = db.Column(db.String(20))  # 교육 이수 상태
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)
    training_type_id = db.Column(db.Integer, db.ForeignKey('training_type.id'), nullable=False)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task_name = db.Column(db.String(100))
    department = db.Column(db.String(50))
    priority = db.Column(db.String(20))  # 우선순위
    due_date = db.Column(db.Date)  # 마감일
    status = db.Column(db.String(20))  # 과제 상태
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)
