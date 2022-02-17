import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';//THIS IS A NAMED IMPORT


const config = require('./config.json')

function LoadMore2() {
    //1. state/variable
        const [student, setStudent] = useState({
        data:[]
    });

    //2. functions defination


    let getMyTeacher = (pageno=1)=>{ //e = event
        //console.log(config.base_url);
        console.log("good morning");
        //Always wrap the api calling code inside try-chatch block
        try {
            //call the api 
            //fatch api or
            //axios api
            //what is the api
            //fetch api with promise chain
            fetch(`${config.base_url}/api/teachers`
            ).then( (data)=>{
                //lets make data json readable 
                return data.json();
            } ).then( (data)=>{
                //console.log(data);


                //set karne se phle data 
                //console.log("before set",student);
                //now set the student data in student hook variable
                setStudent(data)
                //set karne ke bad data kya he
                //console.log("after set",student);
                
            } ).catch( (err)=>{
                console.log(err);
            } );
        } catch (error) {
            console.log(error);
        }
    }
    //3. return statement/JSX
    return (
        <>  
            <div className='d-flex justify-content-center'>
                <h1>Read Operation</h1> 
            </div>
            <div className='d-flex justify-content-center'>
                <Button onClick={ (e)=>{ getMyTeacher() } }>GET MY TEACHER</Button> 
            </div>
            <br></br>
            {
                student.data.length > 0 &&
                <React.Fragment>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>id</th>
                            <th>Teacher Name</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                student.data.map(function(currentValue, index, arr){
                                    //console.log(arr[index].id);
                                    return (
                                            <tr key={index}>   
                                                <td>{arr[index].id}</td>
                                                <td>{arr[index].attributes.name}</td>
                                                <td>
                                                    <Button className='btn btn-primary' size="sm">View</Button>&nbsp;
                                                    <Button className='btn btn-info' size="sm">Edit</Button>&nbsp;
                                                    <Button className='btn btn-danger' size="sm" >Delete</Button>
                                                </td>
                                            </tr>
                                    )//JSX
                                })
                            }
                            
                        </tbody>
                    </Table>

                </React.Fragment>
            }
        </>
    );
    
}
export default LoadMore2;
