const getToken = async (userid, password, projectname) => {
  try {
    const endpoint = "https://identity.c3j1.conoha.io/v3/auth/tokens";
    const response = await fetch(endpoint, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth: {
          identity: {
            methods: ["password"],
            password: {
              user: {
                id: userid,
                password: password,
              },
            },
          },
          scope: {
            project: {
              id: projectname,
            },
          },
        },
      }),
    });
    const headers = await response.headers;
    const token = headers.get("x-subject-token");
    return token;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getVolumeType = async (token) => {
  try {
    const endpoint = `https://block-storage.c3j1.conoha.io/v3/${process.env.PROJECTNAME}/types`;
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "X-Auth-Token": token,
      },
    });
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let jsonString = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      jsonString += decoder.decode(value, { stream: true });
    }
    const data = JSON.parse(jsonString);
    return data.volume_types;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getImageID = async (token) => {
  try {
    const endpoint = "https://image-service.c3j1.conoha.io/v2/images?name=vmi-centos-stream9-amd64";
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "X-Auth-Token": token,
      },
    });
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let jsonString = "";
    while (true) {
      const {done, value} = await reader.read();
      if(done){
        break;
      }
      jsonString += decoder.decode(value, {stream: true});
    }
    const data = JSON.parse(jsonString);
    return data.images;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

require("dotenv").config({ path: ".env.local" });
const userid = process.env.USERID;
const password = process.env.PASSWORD;
const projectname = process.env.PROJECTNAME;

t = "";
getToken(userid, password, projectname).then((token) => {
  console.log(token);
  getVolumeType(token).then((data) => {
    console.log(data);
  });
  getImageID(token).then(data => {
    console.log(data);
  }) 
});
