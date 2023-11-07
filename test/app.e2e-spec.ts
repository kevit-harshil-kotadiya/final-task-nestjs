import { Test, TestingModule } from '@nestjs/testing';
import { Body, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });



  let adminToken = '';
  let studentToken = '';
  let staffToken = '';

  describe('AdminLogin', () => {
    it('admin login with correct credentials', () => {
      return request(app.getHttpServer())
        .post('/administration/login')
        .send({
          administratorId: '1a',
          password: 'admin@log01',
        })
        .expect(200)
        .then((res) => {
          adminToken = res.body.token;
        });
    });

    it('admin login with incorrect credentials', () => {
      return request(app.getHttpServer())
        .post('/administration/login')
        .send({
          administratorId: '1a',
          password: 'admin@og01',
        })
        .expect(401);
    });
  });

  describe('StaffbyAdmin',()=>{
      it('add newstaff by admin', () => {
        return request(app.getHttpServer())
            .post('/administration/add-staff')
            .set({"Authorization":`Bearer ${adminToken}`})
            .send({
              "administratorName":"Harshil",
              "profile":"staff",
              "administratorId":"48s",
              "password":"admin@log01"
            })
            .expect(201)
      });

      it('add staff by admin but staff already present', () => {
        return request(app.getHttpServer())
          .post('/administration/add-staff')
            .set({"Authorization":`Bearer ${adminToken}`})
            .send({
              "administratorName":"Harshil",
              "profile":"staff",
              "administratorId":"48s",
              "password":"admin@log01"
            })
          .expect(409)
      });
  })

    describe('StaffLogin',()=>{
        it('staff login with correct credentials', () => {
            return request(app.getHttpServer())
                .post('/administration/login')
                .send({
                    administratorId: '48s',
                    password: 'admin@log01',
                })
                .expect(200)
                .then((res) => {
                    staffToken = res.body.token;
                });
        });
        it('staff login with incorrect credentials', () => {
            return request(app.getHttpServer())
                .post('/administration/login')
                .send({
                    administratorId: '47s',
                    password: 'admin@og01',
                })
                .expect(401);
        });
    })

    describe('Staff adding staff',()=>{
        it('add newstaff by staff', () => {
          return request(app.getHttpServer())
              .post('/administration/add-staff')
              .set({"Authorization":`Bearer ${staffToken}`})
              .send({
                "administratorName":"Harshil",
                "profile":"staff",
                "administratorId":"49s",
                "password":"admin@log01"
              })
              .expect(401)
        });

    })

    describe('add students by admin',()=>{
        it('add newstudent by admin', () => {
          return request(app.getHttpServer())
              .post('/administration/student')
              .set({"Authorization":`Bearer ${adminToken}`})
              .send({
                "name":"harshil5",
                "studentId":"69",
                "phoneNumber":8866224902,
                "password":"student@log01",
                "currentSem":7,
                "department":"ME",
                "batch":2021
              })
              .expect(201);
        });

        it('add student by admin but student already present', () => {
          return request(app.getHttpServer())
              .post('/administration/student')
              .set({"Authorization":`Bearer ${adminToken}`})
              .send({
                "name":"harshil5",
                "studentId":"69",
                "phoneNumber":8866224902,
                "password":"student@log01",
                "currentSem":7,
                "department":"ME",
                "batch":2021
              })
              .expect(409)
        });

        it('add newstudent by staff', () => {
          return request(app.getHttpServer())
              .post('/administration/student')
              .set({"Authorization":`Bearer ${staffToken}`})
              .send({
                "name":"harshil5",
                "studentId":"70",
                "phoneNumber":8866224902,
                "password":"student@log01",
                "currentSem":7,
                "department":"ME",
                "batch":2021
              })
              .expect(201)
        });
    })

    describe('getting information by admin',()=>{

        it('gettting list of student by admin', () => {
          return request(app.getHttpServer())
              .get('/administration/list-students')
              .set({"Authorization":`Bearer ${adminToken}`})
              .expect(200)
        });

        it('getting list of absent students by admin', () => {
          return request(app.getHttpServer())
              .get('/administration/absent-students')
              .set({"Authorization":`Bearer ${adminToken}`})
              .send({
                "date":"2023-11-03"
              })
              .expect(200)
        });

        it('getting list of students with less attendence by admin', () => {
          return request(app.getHttpServer())
              .get('/administration/less-attendance')
              .set({"Authorization":`Bearer ${adminToken}`})
              .send({
                "sem":"7"
              })
              .expect(200)
        });

        it('getting list of students with less attendence by admin without sending a body', () => {
          return request(app.getHttpServer())
              .get('/administration/less-attendance')
              .set({"Authorization":`Bearer ${adminToken}`})
              .expect(200)
              .expect('Please enter a sem')
        });

        it('getting departments by admin', () => {
          return request(app.getHttpServer())
              .get('/administration/departments')
              .set({"Authorization":`Bearer ${adminToken}`})
              .send({
                "year":2021
              })
              .expect(200)
        });

        it('adding new department by admin', () => {
          return request(app.getHttpServer())
              .put('/administration/departments')
              .set({"Authorization":`Bearer ${adminToken}`})
              .send({
                "year":"2025",
                "branches":[{
                  "name":"IT",
                  "totalStudentsIntake":320
                },{
                  "name":"CE",
                  "totalStudentsIntake":320
                },{
                  "name":"ME",
                  "totalStudentsIntake":320
                }]
              })
              .expect(200)
        });

        it('updating an existing department by admin', () => {
          return request(app.getHttpServer())
              .put('/administration/departments')
              .set({"Authorization":`Bearer ${adminToken}`})
              .send({
                "year":"2025",
                "branches":[{
                  "name":"IT",
                  "totalStudentsIntake":400
                },{
                  "name":"CE",
                  "totalStudentsIntake":400
                },{
                  "name":"ME",
                  "totalStudentsIntake":400
                }]
              })
              .expect(200)
              .expect('Department has been updated')
        });

        it('updating an existing student by admin', () => {
          return request(app.getHttpServer())
              .put('/administration/student')
              .set({"Authorization":`Bearer ${adminToken}`})
              .send({
                "studentId":"69",
                "phoneNumber":7567500061,
                "name":"HARSHIL",
                "currentSem":8
              })
              .expect(200)
              .expect('student updated successfully')
        });

        it('updating an non-existing student by admin', () => {
          return request(app.getHttpServer())
              .put('/administration/student')
              .set({"Authorization":`Bearer ${adminToken}`})
              .send({
                "studentId":"99",
                "phoneNumber":7567500061,
                "name":"HARSHIL",
                "currentSem":8
              })
              .expect(200)
              .expect('Student not found')
        });
    })




    describe('student login',()=>{
        it('student login with correct credentials', () => {
          return request(app.getHttpServer())
            .post('/student/login')
              .send({
                "studentId":"69",
                "password":"student@log01"
              })
            .expect(200)
              .then((res)=>{
                  studentToken=res.body.token;
              })
        });

        it('student login with incorrect credentials', () => {
          return request(app.getHttpServer())
            .post('/student/login')
              .send({
                "studentId":"69",
                "password":"studen@log01"
              })
            .expect(401)
        });

    })

    describe('recording attendance by student',()=>{
        it('recording attendance by student', () => {
          return request(app.getHttpServer())
              .post('/student/attendence')
              .set({"Authorization":`Bearer ${studentToken}`})
              .expect(201)
              .expect('Attendance Recorded!')
        });

        it('recording already recorded attendance by student', () => {
          return request(app.getHttpServer())
            .post('/student/attendence')
              .set({"Authorization":`Bearer ${studentToken}`})
            .expect(409)
            .expect({
              message: 'Attendance already recorded!!',
              error: 'Conflict',
              statusCode: 409,
            });
        });
    })


});
