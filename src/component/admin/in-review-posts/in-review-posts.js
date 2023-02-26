import { getInReviewPosts, approvePost, makePostLive } from './../../../services/posts/posts';
import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form,Input, notification, Alert } from 'antd';
import { EditOutlined, CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import './in-review-posts.scss';

export const InReviewPosts = () => {
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState(true);
    const [dataSource, setDataSource] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postUpdateData, setPostUpdateData] = useState({});
    const [form] = Form.useForm();
    const [postedSuccessfully, setPostedSuccessfully] = useState(false);
    const [deletedSuccessfully, setDeletedSuccessfully] = useState(false);
    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = () => {
        getInReviewPosts(({ data }) => {
            setDataSource(data.records);
        }, () => {}, () => {setLoading(false)})
    }

    useEffect(() => {
        if(postedSuccessfully || deletedSuccessfully) {
            setTimeout(() => {
                setPostedSuccessfully(false);
                setDeletedSuccessfully(false);
            }, 4000);
        }
    }, [postedSuccessfully, deletedSuccessfully])

    const editPost = (id) => {
        const editPost = dataSource.filter(post => post.id === id);
        if(editPost.length) {
            setIsModalOpen(true);
            setTimeout(() => {
                setPostUpdateData({...{title: editPost[0].fields.title, content: editPost[0].fields.content}});
                // form.resetFields();    
            }, 1000)
        }
    }

    const approvePost = (id) => {
        const approvePost = dataSource.filter(post => post.id === id);
        if(approvePost.length) {
            makePostLive(approvePost[0], (data) => {
                setPostedSuccessfully(true);
                getPosts();
            }, (error) => {
                console.log(error);
            }, () => {

            })
        }
    }

    const deletePost = (id) => {
        const deletePost = dataSource.filter(post => post.id === id);
        if(deletePost.length) {
            makePostLive(deletePost[0], (data) => {
                setDeletedSuccessfully(true);
                getPosts();
            }, (error) => {
                console.log(error);
            }, () => {

            })
        }
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const onFinish = (data) => {
        console.log('Data here :: ', data);
    }

    return(
        <>
            <div className='header-table'>
                <h3>In Review Posts</h3>
                <Button className='button' type="primary" icon={<PlusOutlined />}>
                    Create Post
                </Button>
            </div>
            <Table loading={loading} dataSource={dataSource}>
                <Table.Column
                    title="Title"
                    dataIndex="fields"
                    key="title"
                    render={fields => (
                        <>{fields.title}</>
                    )}
                    width='200px'
                />
                <Table.Column
                    title="Content"
                    dataIndex="fields"
                    key="content"
                    render={fields => (
                        <>{fields.content}</>
                    )}
                    width='300px'
                />
                <Table.Column
                    title="Tags"
                    dataIndex="fields"
                    key="tags"
                    render={fields => (
                        <>{fields.caption}</>
                    )}
                    width='200px'
                />
                <Table.Column
                    title="Source"
                    dataIndex="fields"
                    key="source"
                    render={fields => (
                        <>{fields.source}</>
                    )}
                />
                <Table.Column
                    title="Last edited date"
                    dataIndex="fields"
                    key="lastEditedDate"
                    render={fields => (
                        <>{fields.updated_at}</>
                    )}
                />
                <Table.Column
                    title=""
                    dataIndex="id"
                    key="icons"
                    render={(id) => <>
                            <EditOutlined className='icon' onClick={() => editPost(id)}/>
                            <CheckOutlined className='icon' onClick={() => approvePost(id)} />
                            <CloseOutlined className='icon' onClick={() => deletePost(id)} />
                        </>
                    }
                />
            </Table>

            <Modal title="Edit Post" footer={null} open={isModalOpen} onCancel={handleCancel}>
                <Form
                    name="basic"
                    style={{ minWidth: '100%' }}
                    form={form}
                    initialValues={{title: postUpdateData.title, content: postUpdateData.content}}
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        name={['fields', "title"]}
                        style={{ minWidth: '100%' }}
                        rules={[{required: true, message: 'Please enter a title!' }]}
                    >
                        <Input style={{ minWidth: '100%' }} placeholder="Enter title here..."/>
                    </Form.Item>
                    <Form.Item 
                        name={['fields', 'content']} 
                        style={{ minWidth: '100%' }}
                        rules={[{required: true, message: 'Please enter some content!' }]}
                        
                    >
                        <Input.TextArea style={{ minWidth: '100%' }} placeholder="Enter content here..." />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                        Update
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            {postedSuccessfully ? <div className='successToast'>
                <Alert
                    message="Posted Successfully!"
                    type="success"
                />
            </div> : <></>}
            {deletedSuccessfully ? <div className='successToast'>
                <Alert
                    message="Deleted Successfully!"
                    type="success"
                />
            </div> : <></>}
        </>
    )
}