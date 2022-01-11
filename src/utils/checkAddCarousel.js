const isSelectPic = (data, that) => {
    if(data.length === 0){
        that.$message.warning('请选择图片');
        return false;
    }
    return true;
}

const isAltInput = (data, that) => {
    if(data.length <= 0){
        that.$message.warning('请输入简介');
        return false;
    }
    return true;
}

const isSelectOnline = (data, that) => {
    if(data !== '上线' && data !== '不上线'){
        that.$message.warning('请选择是否上线');
        return false;
    }
    return true;
}

export default {
    isSelectPic,
    isAltInput,
    isSelectOnline
}