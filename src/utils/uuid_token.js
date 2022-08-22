import { v4 as uuidv4} from 'uuid'

export const getUUID = () => {
    // 先判断本地是否存储，获取本地的存储
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    // // 如果没有
    if (!uuid_token){
        uuid_token = uuidv4();
        // 并且将这次生成的随机码传给本地存储
        localStorage.setItem('UUIDTOKEN',uuid_token);
    }
    return uuid_token;
}