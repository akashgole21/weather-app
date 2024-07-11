import React from 'react'

import { Row, Col } from "react-bootstrap";

export default function DateTime() {
    const currentDay = new Date().toLocaleDateString("en-US", { day : '2-digit' });
    const currentMonth = new Date().toLocaleDateString("en-US", { month: "long" });

    const currentTime = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: 'numeric',
        hour12: true, // Optional: Use 12-hour format (default is 24-hour)
      });

    return (
        <>
            <div className='dateTime-section'>
                <Row>
                    <Col sm={6}>
                        <h3>{currentDay} {currentMonth}</h3>
                    </Col>

                    <Col sm={6}>
                        <h3>{currentTime}</h3>
                    </Col>
                </Row>
            </div>
        </>
    );
}
