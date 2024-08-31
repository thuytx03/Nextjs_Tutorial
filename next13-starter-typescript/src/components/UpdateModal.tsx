'use client'
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface IProps {
    showModalUpdate: boolean;
    setShowModalUpdate: (value: boolean) => void;
    blog: IBlog | null;
    setBlog: (value: IBlog | null) => void;
}
function UpdateModal(props: IProps) {
    const { showModalUpdate, setShowModalUpdate, blog, setBlog } = props
    const [id, setId] = useState<number | string>('')
    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [author, setAuthor] = useState<string>("")

    useEffect(() => {
        if (blog && blog.id) {
            setId(blog.id)
            setTitle(blog.title)
            setContent(blog.content)
            setAuthor(blog.author)
        }
    }, [blog])
    const handleSubmit = () => {

        fetch(`http://localhost:3001/blogs/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content, author })
        }).then(res => {
            if (res) {
                toast.success('Success!')
                mutate("http://localhost:3001/blogs")
                handleCloseModal()
            }
        })
    }
    const handleCloseModal = () => {
        setAuthor(" ")
        setContent(" ")
        setTitle(" ")
        setBlog(null)
        setShowModalUpdate(false)
    }
    return (
        <>
            <Modal
                show={showModalUpdate}
                onHide={() => handleCloseModal()}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update a Blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="text" placeholder="Enter Author"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Content</Form.Label>
                            <Form.Control as='textarea' rows={3} placeholder="Enter Content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModal()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit()}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateModal;