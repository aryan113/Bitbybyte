import './admin-header.scss';
import logo from './../../../assets/images/reshorts-logo.png';
import { Typography } from 'antd';
const { Title } = Typography;

export const AdminHeader = () => {
    return(
        <>
            <div className='admin-header-cont-0'>
                <div className='logo-cont'>
                    <img src={logo} alt='Reshorts Logo' />
                </div>
                {/* <div className='description-con'>
                    <Title level={4}>Short Real Estate content for you</Title>
                </div> */}
            </div>
        </>
    )
}