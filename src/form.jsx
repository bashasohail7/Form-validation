import React, { Component } from 'react'
import axios from 'axios';

 class Contactus extends Component {
    constructor(){
        super();
        this.state={
            fieldList:{},
            errorList:{},
            statename:''
        
        }

        }
        pickfname=(obj)=>{
             this.setState({fname:obj.target.value.replace(/[^a-zA-Z]/ig,'')})
        }
        picklname=(obj)=>{
            this.setState({lname:obj.target.value.replace(/[^a-zA-Z]/ig,'')})
       }
        processinput=(obj)=>{
            let fieldList=this.state.fieldList;
            fieldList[obj.target.name]=obj.target.value
            //fieldList[key]=value
            //fieldList["fname"]="Sohail"
            //fieldList["mobile"]="8877799443"
            //fieldList["email"]="Sohail@gmail.com"
            this.setState({
                fieldList
            })
               
        }
         borderRed=(id)=>document.getElementById(id).style.border="1px solid red"
          borderNone=(id)=>document.getElementById(id).style.border=""
        getdata=()=>{
        var url="http://localhost:3001/state_dist"
        var state="<option name='states' value=''>Choose a state</option>";
       
        axios.get(url).then(res=>{

            for(var i=0;i<res.data.length;i++){
                     state+="<option value="+res.data[i].id+">"+res.data[i].name+"</option>"
            }
            document.getElementById('states').innerHTML=state;
            
        })
    }
    dist=()=>{
        var url="http://localhost:3001/state_dist";
       
        var stateid=document.getElementById('states').value;
        axios.get(url).then(res=>{
            for(var j=0;j<res.data.length;j++){
                this.setState({
                    statename:res.data[stateid].name
                })
            }
        })
        var dist="<option  value='' >Choose a district</option>";

  axios.get(url).then(res=>{
// alert(res.data[stateid].id)
    for(var i=0;i<res.data[stateid].districts.length;i++){
             dist+="<option  >"+res.data[stateid].districts[i].name+"</option>"
    }
    document.getElementById('dist').innerHTML=dist;
    
})
    }

    componentDidMount(){
        this.getdata()
    }
        save=(obj)=>{
            let fieldList=this.state.fieldList;
            let errorList=this.state.errorList;
            obj.preventDefault();//to prevent default functionalities (reloading of page)
         
        let mpattern = /^[6-9]\d{9,11}$/; // 6-9 refers to number start from 6 to 9 and \d refers to digit and {9} refers to 10 digits [array 0 to 9]
        let epattern=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

      if(!document.getElementById('dob').value|| !document.querySelector('input[name="gender"]:checked')||(document.getElementById('states').value<0)||(!document.getElementById('dist').value)||( ! this.state.fname || this.state.fname.length<3)||(! epattern.test(fieldList.email)))
      {
        if(!document.querySelector('input[name="gender"]:checked')){
            errorList["genderError"]="Please select yoiur gender!"
        }else{errorList["genderError"]=" "}
        // DOB validation==================
        if(!document.getElementById('dob').value){
            errorList["dobError"]="Please select your Date of Birth!"
            this.borderRed('dob')}
            else{ errorList["dobError"]=""
                this.borderNone('dob')}
        //   FIRST NAME VALIDATION =============================     
        if( ! this.state.fname || this.state.fname.length<3){
            errorList["fnameError"]="Please Enter valid Name !"
            this.borderRed('fname')}
            else{
            errorList["fnameError"]="";
            this.borderNone('fname') }
        //*email verfication
        if( ! epattern.test(fieldList.email)){
            errorList["emailError"]="Please enter valid emailid !"
        }else{errorList["emailError"]=""}
//STATE VALIDATION ============================================
if((document.getElementById('states').value=="")){
    errorList["statesError"]="Please select a state !"
    this.borderRed('states')
}else{
    errorList["statesError"]=""
    this.borderNone('states')
}

//DSITRICT valdiation=======================================================
if((!document.getElementById('dist').value)){
    errorList["distError"]="Please select a district !"
    this.borderRed('dist')
}else{
    errorList["distError"]=""
    this.borderNone('dist')
}
         this.setState({errorList})
    }
    else{
        //     if(this.state.lname==undefined){
        // var data={ "name":this.state.fname,"dob":fieldList.dob,'gender':fieldList.gender,"email":fieldList.email,"mobile":fieldList.mobile,"state":this.state.statename,"dist":document.getElementById('dist').value,"address":this.state.fieldList.address};
        //     }
        //    if(!this.state.fieldList.address){
        //         var data={ "name":this.state.fname+' '+this.state.lname,"dob":fieldList.dob,'gender':fieldList.gender,"email":fieldList.email,"mobile":fieldList.mobile,"state":this.state.statename,"dist":document.getElementById('dist').value,};

        //     }
        //     else{
        // var data={ "name":this.state.fname,"dob":fieldList.dob,'gender':fieldList.gender,"email":fieldList.email,"mobile":fieldList.mobile,"state":this.state.statename,"dist":document.getElementById('dist').value,};

        //     }
       
        var data={ "fname":this.state.fname,"lname":this.state.lname,"dob":fieldList.dob,'gender':fieldList.gender,"email":fieldList.email,"mobile":fieldList.mobile,"state":this.state.statename,"dist":document.getElementById('dist').value,"address":this.state.fieldList.address};
       
        var url="http://localhost:3001/inputdata";
              axios.post(url,data)
             window.location.href="http://localhost:3000/#/details/";
    } 
        }
    render() {
        return (
            <form className="container mt-3">
                <div className="row">
                <h2 className="text-center text-primary">React Form Validation</h2>
                    <form onSubmit={this.save} className="col-lg-5">
                            <div className="row mb-3">
                                <label  >First Name  <em>*</em> </label>
                                <div >
                                    <input type="text" maxLength='20'  id='fname' className="form-control" value={this.state.fname}  name="fname" onChange={this.pickfname}  />
                                    <small >{this.state.errorList.fnameError}</small>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label >Gender <em>*</em></label>
                                <div className="col-lg-8">
                                         <input type="radio" value='male' onChange={this.processinput} class='gender' name='gender'/>Male <br />
                                         <input type="radio" value='female' onChange={this.processinput} class='gender'  name='gender'/>Female <br />
                                         <input type="radio" value='others' onChange={this.processinput} class='gender' name='gender'/>Others <br />
                                    <small >{this.state.errorList.genderError}</small>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label >email id <em>*</em> </label>
                                <div >
                                    <input type="text" className="form form-control" value={this.state.fieldList.email} name="email" onChange={this.processinput} />
                                    <small >{this.state.errorList.emailError}</small>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label>State  <em>*</em></label>
                                <div>
                                <select className='form form-control' name='states'  onChange={this.processinput} onChange={this.dist.bind(this)} id='states'>
                                    <option  value="">Choose state</option>
                                </select>
                                <small>{this.state.errorList.statesError}</small>
                                </div>
                            </div>
                    </form>
                    <div className="col-lg-2"></div>
                    <div className="col-lg-5">
                           <div className="row mb-3">
                                <label>Last Name </label>
                                <div>
                                <input type="text" className="form form-control" maxLength='20' value={this.state.lname} name="lname" onChange={this.picklname}   />
                                </div>
                           </div>
                       
                           <div className="row mb-3">
                                <label >Date of birth <small >*</small></label>
                                       <div>
                                       <input type="date"  className='form form-control' onChange={this.processinput} id='dob' name='dob'/>
                                    <small >{this.state.errorList.dobError}</small>
                                       </div>
                            </div><br />
                            <div className="row mb-3">
                                <label >Mobile Number </label>
                                <div >
                                    <input type="number" className="form form-control" id="mobile" value={this.state.fieldList.mobile} name="mobile" onChange={this.processinput} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label>District <em>*</em></label>
                                <div>
                                <select  id='dist' className='form form-control'>
                                    <option value="">First select a State </option>
                                </select>
                                <small>{this.state.errorList.distError}</small>
                                </div>
                            </div>
                    </div>
                    <label>Address : </label>
                    <div className='mb-3'>
                        <textarea name=""  className='form form-control' onChange={this.processinput}  value={this.state.fieldList.address} name='address'  cols="30" ></textarea>
                    </div>
                            <div className="text-center">
                                <button className="btn btn-primary" type="button" onClick={this.save}>Submit</button>
                            </div>
                    </div>
                    <div className="col-lg-3"></div>
                </form>
                
        )
    }
}
export default Contactus
