import React, { useEffect, useState } from 'react';
import { Footer } from '../../../component/footer/footer';
import { Header } from '../../../component/header/header';
import { Col, Row, Skeleton } from 'antd';
import './post-list.scss';
import { BriefPost } from '../../../component/brief-post/brief-post';
import { getPosts } from '../../../services/posts/posts';

export const PostList = () => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        getPosts(({ data }) => {
            setPosts(data.records);
        }, () => {}, () => {
            setLoading(false);
        })
    }, []);
    
    return(
        <>
            <div className="container">
            <Header />
            {loading && <> 
                <div className='body-cont'>
                    <Row gutter={[{ xs: 8, sm: 8, md: 8, lg: 16 }, { xs: 8, sm: 8, md: 8, lg: 16 }]}>
                        {
                            [1,2,3,4].map((item, index) => <React.Fragment key={index}>
                                <Col className="gutter-row"  span={8}>
                                    <Skeleton.Image active={false}  />
                                </Col>
                                <Col className="gutter-row"  span={8}>
                                    <Skeleton.Image active={false}  />
                                </Col>
                                <Col className="gutter-row"  span={8}>
                                    <Skeleton.Image active={false}  />
                                </Col>
                            </React.Fragment>
                        )}
                    </Row>
                </div>
            </>}
            {!loading &&
                <div className='body-cont'>
                    <Row gutter={[{ xs: 8, sm: 8, md: 8, lg: 16 }, { xs: 8, sm: 8, md: 8, lg: 16 }]}>
                        {
                            posts.map((item, index) => <React.Fragment key={index}>
                                <Col className="gutter-row"  span={8}>
                                    <BriefPost post={item} />
                                </Col>
                            </React.Fragment>
                        )}
                    </Row>
                </div>
            }
            <Footer />
            </div>
        </>
    )
}