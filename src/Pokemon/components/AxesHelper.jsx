import React from 'react';
import { AxesHelper as ThreeAxesHelper } from 'three';
import { useThree } from '@react-three/fiber';

const AxesHelper = ({ size }) => {
    const { scene } = useThree();
    React.useEffect(() => {
        const axesHelper = new ThreeAxesHelper(size);
        scene.add(axesHelper);
        return () => {
            scene.remove(axesHelper);
        };
    }, [scene, size]);
    return null;
};

export default AxesHelper;
