
import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';//THIS IS A NAMED IMPORT
import swal from 'sweetalert';
import URL from './Helper';

const axios = require('axios');
const config = require('./config.json')

function LoadMore() {
//1. state/variable
const [student, setStudent] = useState({
    data:[],
    meta:{//this is used for define loadMore function
        pagination:{
          page: '',
          pageCount: '',
          pageSize: '',
          total: ''
        }
    }
});


//2. functions defination
let loadMore = (e) =>{
    //console.log("loadMore");
    //if i am on the last page then loadmore should not call the api
    if(student.meta.pagination.page !== student.meta.pagination.pageCount){
        getMyTeacher(student.meta.pagination.page + 1)
    }
}
let handalDelete = (e) =>{
    var tr = e.target.closest('tr');
    console.log(e.target.closest('tr').querySelector('td:first-child').innerHTML); //e is a event object
    var delid = parseInt(e.target.closest('tr').querySelector('td:first-child').innerHTML);
    console.log(delid);
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then( async (willDelete) => {
        if (willDelete) {
            try { // it is error hendling functionality
               await axios.delete(  URL+ '/api/teachers/' + delid);
               tr.remove();
               swal("Good job!", "You clicked the button!", "success");
            } catch (error) {
                console.log(error)
            }
         
        } else {
          swal("Your imaginary file is safe!");
        }
      });
}

let getMyTeacher = (pageno=1)=>{ //e = event
    //console.log(config.base_url);
    //console.log("good morning");
    //Always wrap the api calling code inside try-chatch block
    try {
        //call the api 
        //fatch api or
        //axios api
        //what is the api
        //fetch api with promise chain
        fetch(`${config.base_url}/api/teachers?pagination[page]=${pageno}&pagination[pageSize]=10`
        ).then( (data)=>{
            //lets make data json readable 
            return data.json();
        } ).then( (data)=>{
            //console.log(data);


            //set karne se phle data 
            //console.log("before set",student);
            //now set the student data in student hook variable
            setStudent({
                ...student,
                data:student.data.concat(data.data),
                meta:data.meta //1 array student.data //2 data.data
            });
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
            <h1>Read Load More Operation  </h1> 
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
                                                <Button className='btn btn-danger' size="sm" onClick={ (e)=>{ handalDelete(e) } }>Delete</Button>
                                            </td>
                                        </tr>
                                )//JSX
                            })
                        }
                        
                    </tbody>
                </Table>

                {
                    (student.meta.pagination.page !== student.meta.pagination.pageCount) &&
                    <div className='d-flex justify-content-center'>
                        <Button variant="primary" onClick={ (e)=> { loadMore(e) }}>Load More</Button>
                    </div>
                }
                
                
            </React.Fragment>
        }
        
    </>
  );
  
}
export default LoadMore
