import React, { useEffect, useState } from 'react';
import { Footer } from '../../../component/footer/footer';
import { Skeleton } from 'antd';
import { getPosts } from '../../../services/posts/posts';
import { useParams, useNavigate } from "react-router-dom";
import { LeftOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { HeartOutlined, HeartFilled, ShareAltOutlined } from '@ant-design/icons';
import './post-detail.scss';
import { Typography } from 'antd';
const { Text, Link } = Typography;
const { Title } = Typography;

export const PostDetail = () => {
    const history = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [showShare, setShowShare] = useState(true);
    const [postDetail, setPostDetail] = useState({fields: {}});
    const { fields } = postDetail;
    const [postLiked, setPostLiked] = useState(false);
    
    useEffect(() => {
        if(!navigator?.share) {
            setShowShare(false);
        }
    }, [])

    useEffect(() => {
        getPosts(({ data }) => {
            const postDetails = data.records.filter(post => post.id === id);
            if(postDetails.length) {
                setPostDetail(postDetails[0]);
            }
        }, () => {}, () => {
            setLoading(false);
        })
    }, [id]);
    
    const historyBack = () => {
        history(-1);
    }

    const sharePost = () => {
        if (navigator.share) {
            navigator.share({
                title: fields?.title,
                url: fields?.link
            }).then(() => {
                console.log('Thanks for sharing!');
            }).catch(err => {
                console.log("Error while using Web share API:");
                console.log(err);
            });
        } else {
            console.log("Browser doesn't support this API !");
        }
    }
    return(
        <>
            <div className='header-cont' onClick={() => historyBack()}>
                <LeftOutlined />
                {loading ? <Skeleton.Input /> : <Title level={5} className='title'>{fields?.title}</Title>}
            </div>
            {loading && <> 
                <div className='body-cont'>
                    <Skeleton.Image />
                    <Skeleton />
                </div>
            </>}
            {!loading &&
                <div className='body-cont'>
                    <Card
                        style={{ width: '100%' }}
                        cover={<img alt={fields?.title} src={fields?.background} />}
                    >
                        <div className='description-cont'>
                            <div className='icons'>
                                {postLiked ? <HeartFilled className='heart-icon selected' onClick={() => setPostLiked(false)}/> : <HeartOutlined  className='heart-icon' onClick = {() => setPostLiked(true)} />}
                                {showShare ? <ShareAltOutlined onClick={() => sharePost()} /> : <></>}
                            </div>
                            <div className='heading-cont'>
                                <Text>{fields?.content}</Text>
                            </div>
                            {fields?.source ? <Link href={fields?.link} className='read-more' type="secondary" target="_blank" >
                                read more at {fields.source}
                            </Link> : ''}
                        </div>
                    </Card>
                </div>
            }
            <Footer />
        </>
    )
}