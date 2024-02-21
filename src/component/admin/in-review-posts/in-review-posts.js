import { generateNewPosts, getInReviewPosts, makePostLive, updatePost } from './../../../services/posts/posts';
import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Alert } from 'antd';
import { EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import './in-review-posts.scss';
const { RangePicker } = DatePicker;

export const InReviewPosts = (props) => {
    const { callback } = props;
    const [buttonLoader, setButtonLoader] = useState(false);
    const [updateButtonLoading, setUpdateButtonLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [dataSource, setDataSource] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [postedSuccessfully, setPostedSuccessfully] = useState(false);
    const [deletedSuccessfully, setDeletedSuccessfully] = useState(false);
    const [postFetchedSuccessfully, setPostFetchedSuccessfully] = useState(false);
    const [updatePostSuccessfully, setUpdatePostSuccessfully] = useState(false);
    const dateFormat = 'YYYY-MM-DD';
    const [toDate, setToDate] = useState('2024-02-26T00:00:00');
    const [fromDate, setFromDate] = useState('2024-02-20T00:00:00');
    const [initFormValues, setInitFormValues] = useState({ title: '', caption: '' });
    const [editId, setEditId] = useState('');
    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = () => {
        getInReviewPosts(({ data }) => {
            setDataSource(data.records);
        }, () => { }, () => { setLoading(false) })
    }

    useEffect(() => {
        if (postedSuccessfully || deletedSuccessfully || postFetchedSuccessfully || updatePostSuccessfully) {
            setTimeout(() => {
                setPostedSuccessfully(false);
                setDeletedSuccessfully(false);
                setPostFetchedSuccessfully(false);
                setUpdatePostSuccessfully(false);
            }, 4000);
        }
    }, [postedSuccessfully, deletedSuccessfully, postFetchedSuccessfully, updatePostSuccessfully])

    const editPost = (id) => {
        setIsModalOpen(true);
        setEditId(id);
    }

    useEffect(() => {
        if (editId) {
            const editPostObj = dataSource.filter(post => post.id === editId);
            form.setFieldsValue({
                title: editPostObj[0].fields.title,
                caption: editPostObj[0].fields.caption
            })
        }
    }, [editId])

    const approvePost = (id) => {
        const approvePost = dataSource.filter(post => post.id === id);
        if (approvePost.length) {
            makePostLive(approvePost[0], (data) => {
                setPostedSuccessfully(true);
                getPosts();
                if (callback) {
                    callback();
                }
            }, (error) => {
                console.log(error);
            }, () => {

            })
        }
    }

    const deletePost = (id) => {
        const deletePost = dataSource.filter(post => post.id === id);
        if (deletePost.length) {
            makePostLive(deletePost[0], (data) => {
                setDeletedSuccessfully(true);
                getPosts();
                if (callback) {
                    callback();
                }
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
        setUpdateButtonLoading(true);
        updatePost({ ...data, id: editId }, (data) => {
            setUpdatePostSuccessfully(true);
            handleCancel();
            getPosts();
        }, (error) => {
            console.log(error);
        }, () => {
            setUpdateButtonLoading(false);
        })
    }

    const selectDate = (fromDate, date) => {
        setToDate(`${date[1]}T00:00:00`);
        setFromDate(`${date[0]}T00:00:00`);
    }

    const generatePosts = () => {
        setButtonLoader(true);
        generateNewPosts({ from: fromDate, to: toDate }, (data) => {
            setPostFetchedSuccessfully(true);
            getPosts();
        }, () => {

        }, () => {
            setButtonLoader(false)
        })
    }

    return (
        <>
            <div className='header-table'>
                <h3>In Review Posts</h3>
                {/* <Button className='button' type="primary" icon={<PlusOutlined />}>
                    Create Post
                </Button> */}
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
                        <EditOutlined className='icon' onClick={() => editPost(id)} />
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
                    initialValues={initFormValues}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="title"
                        style={{ minWidth: '100%' }}
                        rules={[{ required: true, message: 'Please enter a title!' }]}
                    >
                        <Input style={{ minWidth: '100%' }} placeholder="Enter title here..." />
                    </Form.Item>
                    <Form.Item
                        name="caption"
                        style={{ minWidth: '100%' }}
                    >
                        <Input style={{ minWidth: '100%' }} placeholder="Enter tags here..." />
                    </Form.Item>
                    <Form.Item>
                        <Button disabled={updateButtonLoading} type="primary" htmlType="submit">
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

            {postFetchedSuccessfully ? <div className='successToast'>
                <Alert
                    message="News Fetched Successfully!"
                    type="success"
                />
            </div> : <></>}

            {updatePostSuccessfully ? <div className='successToast'>
                <Alert
                    message="Post Updated Successfully!"
                    type="success"
                />
            </div> : <></>}

            <div className='fetchPostModal'>
                <h3>for Demo: Fetch News</h3>
                <RangePicker className='range-picker'
                    defaultValue={[dayjs('2024/02/20', dateFormat), dayjs('2024/02/26', dateFormat)]}
                    format={dateFormat}
                    onChange={selectDate}
                /><br />
                <Button disabled={buttonLoader} type='primary' onClick={generatePosts}>
                    Fetch News
                </Button>
            </div>
        </>
    )
}