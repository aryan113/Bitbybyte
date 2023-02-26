import { Footer } from '../../component/footer/footer';
import './admin.scss';
import React, { useState } from 'react';
import { AdminHeader } from '../../component/header/admin-header/admin-header';
import { InReviewPosts } from '../../component/admin/in-review-posts/in-review-posts';
import { ScheduledPosts } from '../../component/admin/scheduled-posts/scheduled-posts';
import { LivePosts } from '../../component/admin/live-posts/live-posts';
export const Admin = () => {
    // {
    //     label: 'Scheduled',
    //     id: 'scheduled',
    //     count: null
    // }, 
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
                return <InReviewPosts />
            case 'scheduled':
                return <ScheduledPosts />
            case 'live':
                return <LivePosts />
            default:
                return <InReviewPosts />
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
                                {item.label}
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