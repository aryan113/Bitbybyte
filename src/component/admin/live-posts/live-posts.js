import { getPosts } from './../../../services/posts/posts';
import { useEffect, useState } from 'react';
import { Table } from 'antd';
import './live-posts.scss';

export const LivePosts = () => {
    const [loading, setLoading] = useState(true);
    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        getApprovedPosts();
    }, []);

    const getApprovedPosts = () => {
        getPosts(({ data }) => {
            setDataSource(data.records);
        }, () => {}, () => {setLoading(false)})
    }
    return(
        <>
            <div className='header-table'>
                <h3>Live Posts</h3>
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
            </Table>
        </>
    )
}
