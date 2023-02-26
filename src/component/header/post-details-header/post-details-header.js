import './post-details-header.scss';
import { LeftOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { Skeleton } from 'antd';
import { useNavigate } from "react-router-dom";
const { Title } = Typography;
export const PostDetailsHeader = (props) => {
    const { title, loading} = props;
    const history = useNavigate();
    const historyBack = () => {
        history(-1);
    }
    return(
        <>
            <div className='header-cont' onClick={() => historyBack()}>
                <LeftOutlined />
                {loading ? <Skeleton.Input /> : <Title level={5} className='title'>{title}</Title>}
            </div>
        </>
    )
}