import mitt from 'mitt';

interface ICloseProps {
    params?: any
    id: string
}

type Events = {
    accountChanged: void
};

const emitter = mitt<Events>();

export default emitter;
