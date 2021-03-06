import React from 'react';
import { List, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Songs.scss';
// Redux
import { mapDispatchToProps } from '../../redux/dispatch';

function Songs(props) {

    /**
     * 处理歌曲时间
     * @param {Number} milliseconds 
     */
    const handleTime = (milliseconds) => {
        let time = parseInt(milliseconds/1000, 10);
        let minutes = parseInt(time/60, 10) < 10 ?  '0'+parseInt(time/60, 10): parseInt(time/60, 10);
        let seconds = (time%60) < 10 ?  '0'+(time%60): (time%60);
        return `${minutes}:${seconds}`;
    }

    return (
        <List
            pagination
            className="song"
            size="small"
            itemLayout="horizontal"
            dataSource={props.list} // ! list -> tracks
            renderItem={item => (
            <List.Item
                className="song-item non-hover"
                key={item.id}
                // ! onChangeSong belongs to mapDispatchToProps
                onClick={() => { props.onChangeSong(item.id) }}>
                <List.Item.Meta
                    avatar={
                    <Avatar src={item.al.picUrl} />
                    }
                    title={<Link to= {`/song/${item.id}`} >{item.name}</Link>}
                    description={item.ar[0].name}
                />
                <div><b>歌曲时长：</b>{handleTime(item.dt)}</div>
            </List.Item>
            )}
        />
    )
}

export default connect(null, mapDispatchToProps)(Songs);