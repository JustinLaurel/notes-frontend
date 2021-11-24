import { Skeleton, SkeletonCircle } from '@chakra-ui/react';
import React from 'react';

const SkeletonList = ({ rows }: { rows: number }) => {
    const rowStyle = {
        'height': '26px',
        'width': '500px',
        'alignSelf': 'center'
    };

    const list = [];
    for (let i = 0; i < rows; i++) {
        list.push(
            <React.Fragment key={i}>
                <Skeleton style={rowStyle} />
                <SkeletonCircle visibility='hidden' />
                <SkeletonCircle visibility='hidden'/>
            </React.Fragment>);
    }
    return (
        <>{list}</>
    );
};

export default SkeletonList;