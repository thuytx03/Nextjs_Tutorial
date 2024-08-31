'use client'
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import CreateModal from './CreateModal';
import { useState } from 'react';
import UpdateModal from './UpdateModal';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface IProps {
  blogs: IBlog[]
}
function AppTable(props: IProps) {
  const { blogs } = props
  console.log('blogs', blogs)
  const [blog, setBlog] = useState<IBlog | null>(null)
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false)
  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false)
  const handleDelete = (id: number | string) => {
    if (confirm(`Are you sure you want to delete this blog (id= ${id})`)) {
      fetch(`http://localhost:3001/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(res => {
        if (res) {
          toast.success('Success!')
          mutate("http://localhost:3001/blogs")
        }
      })
    }
  }
  return (
    <>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <h1>Table Blogs</h1>
        <button onClick={() => setShowModalCreate(true)} className='btn btn-success'>Add</button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>
                  <Link className='btn btn-primary' href={`/blogs/${item.id}`}>View</Link>
                  <Button
                    onClick={() => {
                      setBlog(item)
                      setShowModalUpdate(true)
                    }}
                    variant="warning" className='mx-3'>Edit</Button>
                  <Button onClick={() => handleDelete(item.id)} variant="danger">Delete</Button>

                </td>
              </tr>
            )
          })}


        </tbody>
      </Table>
      <CreateModal showModalCreate={showModalCreate} setShowModalCreate={setShowModalCreate} />
      <UpdateModal showModalUpdate={showModalUpdate} setShowModalUpdate={setShowModalUpdate} blog={blog} setBlog={setBlog} />
    </>

  );
}

export default AppTable;