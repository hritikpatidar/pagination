import React, { useState } from 'react';
import { Button, Pagination, Table } from 'react-bootstrap';//THIS IS A NAMED IMPORT

const config = require('./config.json')

function MyPagination() {
//1. state/variable
const [student, setStudent] = useState({
    data:[]
});

const [paginationItem, setPaginationItem] = useState([])

//2. functions defination
let first = (e)=>{
    //console.log("first");
    if(student.meta.pagination.page !== 1){
        getMyTeacher(1);
    }
    
}
let last = (e)=>{
    //console.log("last");
    if(student.meta.pagination.page !== student.meta.pagination.pageCount){
        getMyTeacher(student.meta.pagination.pageCount)
    }
}
let prev = (e)=>{
    //console.log("previous");
    if(student.meta.pagination.page !== 1){
        getMyTeacher(student.meta.pagination.page -1)
    }
   
    
}
let next = (e)=>{
    //console.log("next");
    if(student.meta.pagination.page !== student.meta.pagination.pageCount){
        getMyTeacher(student.meta.pagination.page + 1)
    }
}
let goToPage = (e)=>{
    console.log(e.target.innerHTML);
    var pageno = parseInt(e.target.innerHTML);
    getMyTeacher(pageno);
}
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
        fetch(`${config.base_url}/api/teachers?pagination[page]=${pageno}&pagination[pageSize]=10`
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
            var start = data.meta.pagination.page
            var arr = []; //empty array
            for( let i = 1; i <= data.meta.pagination.pageCount; i++){
                if(i === start){
                    arr.push(<Pagination.Item active onClick={ (e)=>{ goToPage(e) }}> {i} </Pagination.Item>)
                }else{
                    arr.push(<Pagination.Item onClick={ (e)=>{ goToPage(e) }}> {i} </Pagination.Item>)
                }
                
            }
            setPaginationItem(arr);

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
                                                <Button className='btn btn-danger' size="sm">Delete</Button>
                                            </td>
                                        </tr>
                                )//JSX
                            })
                        }
                        
                    </tbody>
                </Table>
                <Pagination className="d-flex justify-content-center">
                    <Pagination.First onClick={ (e)=>{ first(e); } }/>
                    <Pagination.Prev onClick={ (e)=>{ prev(e); } }/>

                    {
                       
                       paginationItem.map(function(currentValue, index,arr){
                            return currentValue //JSX
                        })
                    }
                    
                   
                    <Pagination.Next onClick={ (e)=>{ next(e); } }/>
                    <Pagination.Last onClick={ (e)=>{ last(e); } } />
                </Pagination>
            </React.Fragment>
        }
        
    </>
  );
  
}
export default MyPagination
