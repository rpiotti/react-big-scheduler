import React, {Component, PropTypes} from 'react'
import {Row, Col, Icon} from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'
import EventItem from './EventItem'
import DnDSource from './DnDSource'
import './style.css'

class AddMorePopover extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dndSource: new DnDSource((props) => { return props.eventItem;}, EventItem),
        }
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
        headerItem: PropTypes.object.isRequired,
        left: PropTypes.number.isRequired,
        top: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        closeAction: PropTypes.func.isRequired,
        subtitleGetter: PropTypes.func,
        moveEvent: PropTypes.func,
        eventItemClick: PropTypes.func,
        viewEventClick: PropTypes.func,
        viewEventText:PropTypes.string,
        viewEvent2Click: PropTypes.func,
        viewEvent2Text: PropTypes.string,
        eventItemTemplateResolver: PropTypes.func,
    }

    render() {
        const {headerItem, left, top, height, closeAction, schedulerData} = this.props;
        const {config} = schedulerData;
        const {time, start, end, events} = headerItem;
        let header = moment(time).format('YYYY年M月D日 dddd');
        let durationStart = moment(start);
        let durationEnd = moment(end);
        let eventList = [];
        let i = 0;
        let DnDEventItem = this.state.dndSource.getDragSource();
        events.forEach((evt) => {
            if(evt !== undefined) {
                i++;
                let eventStart = moment(evt.eventItem.start);
                let eventEnd = moment(evt.eventItem.end);
                let isStart = eventStart >= durationStart;
                let isEnd = eventEnd < durationEnd;
                let eventItemLeft = 10;
                let eventItemWidth = 138;
                let eventItemTop = 12 + i*config.eventItemLineHeight;
                let eventItem = <DnDEventItem
                                   {...this.props}
                                   key={evt.eventItem.id}
                                   eventItem={evt.eventItem}
                                   leftIndex={0}
                                   isInPopover={true}
                                   isStart={isStart}
                                   isEnd={isEnd}
                                   rightIndex={1}
                                   left={eventItemLeft}
                                   width={eventItemWidth}
                                   top={eventItemTop}
                                   />
                eventList.push(eventItem);
            }
        });

        return (
            <div className="add-more-popover-overlay"  style={{left: left, top: top, height: height, width: '170px'}}>
                <Row type="flex" justify="space-between" align="middle">
                    <Col span="22">
                        <span className="base-text">{header}</span>
                    </Col>
                    <Col span="2">
                        <span onClick={() => {closeAction(undefined);}}><Icon type="cross"></Icon></span>
                    </Col>
                </Row>
                {eventList}
            </div>
        );
    }
}

export default AddMorePopover