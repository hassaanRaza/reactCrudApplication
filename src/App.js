import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import swal from 'sweetalert';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      empFirstName: '',
      empLastName: '',
      empEmail: '',
      empSalary: '',
      empJobStartDate: '',
      inputId : 0,
      //inputFirstName : '',
      inputLastName : '',
      inputEmail : '',
      inputSalary : '',
      inputJobStartDate : '',
      showForm : false,
      text:'Hello World',
      user: '',
      userId: '',
      email: 'admin@domain.com',
      password: 'admin',
      //listOfEmployees:[]
      listOfEmployees:[
        {
          id : 1, firstName : 'Hassaan', lastName: 'Raza', email: 'hassaanraza387@gmail.com',
          salary: 12345, jobStartDate: '06/01/2018'
        },
        {
          id : 2, firstName : 'Talha', lastName: 'Ashfaq', email: 'talhaashfaq387@gmail.com',
          salary: 12345, jobStartDate: '06/01/2018'
        }
    ],
    
    }
    //this.changeText = this.changeText.bind(this);
    this.login = this.login.bind(this);
    this.emailFunction = this.emailFunction.bind(this);
    this.password = this.password.bind(this);
    this.logout = this.logout.bind(this);
    this.addForm = this.addForm.bind(this);
    this.empFirstName = this.empFirstName.bind(this);
    this.empLastName = this.empLastName.bind(this);
    this.empSalary = this.empSalary.bind(this);
    this.empEmail = this.empEmail.bind(this);
    this.empJobStartDate = this.empJobStartDate.bind(this);
    this.addEmployee = this.addEmployee.bind(this);
    // this.edit = this.edit.bind(this);
    // this.delete = this.delete.bind(this);

  }
  // changeText(){
  //   const {text} = this.state;

  //   this.setState({
  //     text : text == 'Hello Pakistan' ? 'Hello World' : 'Hello Pakistan'
  //   })
  // }
  //ques 2//
  //onClick={this.myFunc} - used when we bind our function in constructor
  //onClick={() => this.myFunc()} - used when we are not binding it in constructor and call as arrow function
  //onClick={this.myFunc.bind(this}} - used when we want to pass parameter in our function and also bind it.
  //End
  renderLogin(){
    return (
      <div className="container">
        <div className="row marginTop">
          <div className="col-md-3">
            <input className="form-control" placeholder="Enter your email.." onChange={this.emailFunction}/>
          </div>
        </div>
        <div className="row marginTop">
          <div className="col-md-3">
          <input className="form-control" placeholder="Enter your pass.." type="password" onChange={this.password}/>
          </div>
        </div>
        <div className="row marginTop">
          <div className="col-md-3">
          <button className="btn btn-success" onClick={this.login}>Login</button>
          </div>
        </div>
      </div>
    )
  }
  renderLogout(){
    return(
      <div className="container">
        <div className="row marginTop">
          <div className="col-md-12">
            <div className="pull-right">
              <button className="btn btn-primary" onClick={this.logout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
      
    )
     
  }
  delete(Pid){
    const id = Pid;
    const {listOfEmployees} = this.state;
    const newList = listOfEmployees;
    const index = newList.findIndex(p => p.id == id);
    newList.splice(index, 1);
    this.setState({
      listOfEmployees : newList,
    })
  }
  
  edit(Pid){
    const id = Pid;
    const {listOfEmployees} = this.state;
    const newList = listOfEmployees;
    let obj = newList.find(p => p.id == id);
    //console.log(obj);
    this.setState({
      showForm : true,
      inputId : obj.id,
      empFirstName : obj.firstName,
      empLastName : obj.lastName,
      empEmail : obj.email,
      empSalary : obj.salary,
      empJobStartDate : obj.jobStartDate,
      addUpdate: 'Update'
    })
    // newList.splice(index, 1);
    // this.setState({
    //   listOfEmployees : newList
    // })
  }

  renderEmployeesList(){
    const {listOfEmployees} = this.state;
    return (
        <div className="container">
          <div className="row marginTop">
            <div className="col-md-12">
              <table className="table table-bordered">
              <thead>
              <tr>
                <td>Sno</td>
                <td>First Name</td>
                <td>Last Name</td>
                <td>Email</td>
                <td>Salary</td>
                <td>Job Start Date</td>
                <td>Edit</td>
                <td>Delete</td>
              </tr>
              </thead>
              <tbody>
                {listOfEmployees.length == 0 &&
                <tr>
                  <td colSpan="8">
                  No Records
                  </td>
                </tr>}
            {
              listOfEmployees.map((item, index)=>{
              return (
                
                  <tr key={Math.random() * item.id}>
                    <td>{index + 1}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{item.salary}</td>
                    <td>{item.jobStartDate}</td>
                    <td><button className="btn btn-sm btn-info" onClick={this.edit.bind(this, item.id)}>Edit</button></td>
                    <td><button className="btn btn-sm btn-danger" onClick={this.delete.bind(this,item.id)}>Delete</button></td>
                  </tr>
              )
            })
            }
            </tbody>
            </table>
            </div>
          </div>
        </div>
    )
  }
  login(){
    const {email, password} = this.state;
    const flagLogin = email == 'admin@domain.com' && password == 'admin' ? true : false;
    if(flagLogin){
      this.setState({
        user : true, email, password, userId : 1
      })
    }
    else{
      swal('Wrong credentials')
    }
  }
  logout(){
    this.setState({
      userId:'',
      user:false,
      email:'',
      password:''
    })
  }
  
  emailFunction(e){
    const email = e.target.value;
    this.setState({
      email : email
    }) 
  }
  
  password(e){
    const password = e.target.value;
    this.setState({
      password:password
    })
  }
  renderAddButton(){
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="pull-left">
            <button className="btn btn-success fixedBottomRight" onClick={this.addForm}>+ Employee</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  addForm(){
    //const {showForm} = showForm;
    this.setState({
      showForm : true,
      addUpdate : 'Add'
    })
    // if(showForm){
    //   this.renderAddEmployeeForm()
    // }
    // else{
    //   this.renderAddButton()
    // }
  }
  
  empFirstName(e){
    const empFirstName = e.target.value;
    this.setState({
      empFirstName:empFirstName
    })
  }

  empLastName(e){
    const empLastName = e.target.value;
    this.setState({
      empLastName:empLastName
    })
  }

  empEmail(e){
    const empEmail = e.target.value;
    this.setState({
      empEmail:empEmail
    })
  }

  empSalary(e){
    const empSalary = e.target.value;
    this.setState({
      empSalary:empSalary
    })
  }

  empJobStartDate(e){
    const empJobStartDate = e.target.value;
    this.setState({
      empJobStartDate:empJobStartDate
    })
  }

  generateRandomNumber(minVal, maxVal){
    let randomNumber = Math.random() * (maxVal-minVal) + minVal;
    return Math.floor(randomNumber);
  }

  addEmployee(){
    debugger;
    const {inputId, empFirstName, empLastName, empEmail, empSalary, empJobStartDate, listOfEmployees} = this.state;
    const newList = listOfEmployees;
    let makeId = '';
    if(inputId > 0){
      //Update
      makeId = inputId;
    }
    else{
      makeId = this.generateRandomNumber(1, 100);
    }
    
    let obj = {
      id : makeId,
      firstName: empFirstName,
      lastName: empLastName,
      email: empEmail,
      salary: empSalary,
      jobStartDate: empJobStartDate
    }
    
    if(obj.id && obj.firstName && obj.lastName && obj.salary && obj.jobStartDate){
      
      if(inputId > 0){
        //Update
        const index = newList.findIndex(p=>p.id == inputId);
        newList.splice(index,1,obj);
      }
      else{
        //Add
        newList.push(obj);
      }
      
      this.setState({
      listOfEmployees : newList,
      inputId : 0,
      showForm : false,
      empFirstName : '',
      empLastName : '',
      empEmail : '',
      empSalary : '',
      empJobStartDate : ''
    })
    }
    else{
      swal('These fields are required!');
    }
    
  }

  renderAddEmployeeForm(){
    //const {inputFirstName, inputLastName, inputEmail, inputSalary, inputJobStartDate, addUpdate} = this.state;
    const {addUpdate, empFirstName, empLastName, empEmail, empSalary, empJobStartDate} = this.state;
    return (
      <div className="container">
        <div className="row marginTop">
          <div className="col-md-3">
          <input className="form-control" onChange={this.empFirstName} placeholder="First name.." type="text" value={empFirstName} />
          </div>
        </div>
        <div className="row marginTop">
          <div className="col-md-3">
          <input className="form-control" onChange={this.empLastName} placeholder="Last name.." type="text" value={empLastName} />
          </div>
        </div>
        <div className="row marginTop">
          <div className="col-md-3">
          <input className="form-control" onChange={this.empEmail} placeholder="Email.." type="text" value={empEmail} />
          </div>
        </div>
        <div className="row marginTop">
          <div className="col-md-3">
          <input className="form-control" onChange={this.empSalary} placeholder="Salary.." type="number" value={empSalary} />
          </div>
        </div>
        <div className="row marginTop">
          <div className="col-md-3">
          <input className="form-control" onChange={this.empJobStartDate} placeholder="Job start date.." type="" value={empJobStartDate} />
          </div>
        </div>
        <div className="row marginTop">
          <div className="col-md-3">
          <button className="btn btn-success" onClick={this.addEmployee}>{addUpdate}</button>
          </div>
        </div>
      </div>
    )
  }
  render() {
    const {user, showForm} = this.state;
    return (
      <div>
        {!user && this.renderLogin()}
        {user && this.renderLogout()}
        {user && !showForm && this.renderEmployeesList()}
        {user && !showForm && this.renderAddButton()}
        {user && showForm && this.renderAddEmployeeForm()}
        
        {/* <p>{text}</p>
        <button onClick={this.changeText}>Click me and see magic..</button> */}
      </div>
    );
  }
}

export default App;
