import { Footer } from '../../component/footer/footer';
import './admin.scss';
import React, { useState, useEffect } from 'react';
import { AdminHeader } from '../../component/header/admin-header/admin-header';
import { InReviewPosts } from '../../component/admin/in-review-posts/in-review-posts';
import { ScheduledPosts } from '../../component/admin/scheduled-posts/scheduled-posts';
import { LivePosts } from '../../component/admin/live-posts/live-posts';
import { getInReviewPosts, getPosts } from '../../services/posts/posts';
export const Admin = () => {
    const [inReviewCount, setInreviewCount] = useState();
    const [liveCount, setLiveCount] = useState();
    // {
    //     label: 'Scheduled',
    //     id: 'scheduled',
    //     count: null
    // }, 

    useEffect(() => {
        getReviewPosts();
    }, []);

    const getReviewPosts = () => {
        getInReviewPosts(({ data }) => {
            setInreviewCount(data.records.length);
        }, () => {}, () => {})
    }

    useEffect(() => {
        getApprovedPosts();
    }, []);

    const getApprovedPosts = () => {
        getPosts(({ data }) => {
            setLiveCount(data.records.length);
        }, () => {}, () => {})
    }

    const callbackAfterUpdate = () => {
        console.log('coming here');
        getReviewPosts();
        getApprovedPosts();
    }

    const tabsConfig = [{
        label: 'In Review',
        id: 'in-review',
        count: null
    }, {
        label: 'Published',
        id: 'live',
        count: null
    }];
    const [selectedTab, setSelectedTab] = useState('in-review');

    const getChildren = (id) => {
        switch(id) {
            case 'in-review':
                return <InReviewPosts callback={callbackAfterUpdate} />
            case 'scheduled':
                return <ScheduledPosts callback={callbackAfterUpdate} />
            case 'live':
                return <LivePosts callback={callbackAfterUpdate} />
            default:
                return <InReviewPosts callback={callbackAfterUpdate} />
        } 
    }

    return(
        <>
            <AdminHeader />
            <div className='admin-cont'>
                <div className='item-cont'>
                    {
                        tabsConfig.map((item, index) => <React.Fragment key={index}>
                            <span className={`item ${item.id === selectedTab ? 'selected-tab' : ''}`} onClick={() => setSelectedTab(item.id)} >
                                {item.label} {index === 0 ? ` (${inReviewCount})` : ` (${liveCount})`}
                                {item.count}
                            </span>
                        </React.Fragment>)
                    }
                </div>
                <div className='children'>
                    {getChildren(selectedTab)}
                </div>
            </div>
            <Footer />
        </>
    )
}