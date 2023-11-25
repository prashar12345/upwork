let host = document.location.host;
let apiUrl ='http://portal.jcsoftwaresolution.in:6040/'
if(host.includes('localhost')){
  apiUrl='http://portal.jcsoftwaresolution.in:6040/'
}else if(host.includes('stage.dazhboards.com/')){
  apiUrl='https://endpoint.jcsoftwaresolution.com/'
}else if(host.includes('jcsoftwaresolution.com')){
  apiUrl='http://portal.jcsoftwaresolution.in:6040/'
}else{
  apiUrl='http://portal.jcsoftwaresolution.in:6040/'
}
const environment = {
    api: apiUrl,
    adminRoleId:'64b152a909d268f038611929',
    userRoleId:'64b15102b14de6c28838f7d2',
    map_api_key:'AIzaSyAbD0kk0SRu76yogIQKhY2r-oKdAZIbNIs',
    productTypeId:'64a7d198fa039f179c0320ca'
  };
  export default environment;
