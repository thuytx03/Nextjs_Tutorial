'use client'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface IProps {
    showModalCreate: boolean;
    setShowModalCreate: (value: boolean) => void
}
function CreateModal(props: IProps) {
    const { showModalCreate, setShowModalCreate } = props
    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [author, setAuthor] = useState<string>("")
    const handleSubmit = () => {

        fetch('http://localhost:3001/blogs', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content, author })
        }).then(res => {
            if (res) {
                toast.success('Success!')
                mutate("http://localhost:3001/blogs")
                // console.log('data form', title, author, content)
                handleCloseModal()
            }
        })
    }
    const handleCloseModal = () => {
        setAuthor(" ")
        setContent(" ")
        setTitle(" ")
        setShowModalCreate(false)
    }
    return (
        <>
            {/* <Button variant="primary" onClick={() => setShowModalCreate(true)}>
                Launch static backdrop modal
            </Button> */}

            <Modal
                show={showModalCreate}
                onHide={() => handleCloseModal()}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add a new Blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            {/* <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text> */}
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

export default CreateModal;