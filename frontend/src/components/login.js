import React from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { getDroppedOrSelectedFiles } from "html5-file-selector";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import html2canvas from "html2canvas";
import '../App.css';

export default class login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      a1: true,
      preview: "",
      memecount: 0,
      topText: "",
      bottomText: "",
      allMemeImgs: [],
      randomImg: "",
      email_current_login:(localStorage.getItem("MEME_LOGIN_EMAIL")),
      imagesize:"100",
      imagesize_width:"100"
    };
    this.textInput = React.createRef();
  }

  fileParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" };
  };

  onFileChange = ({ meta, file }, status) => {
    console.log(status, meta, file);
    if (status === "done") {
      this.setState({ randomImg: meta.previewUrl });
    }
  };
  onSubmit = (files, allFiles) => {
    this.setState({
      a1: false,
      preview: allFiles[0].meta.previewUrl
    });
  };
  getFilesFromEvent = (e) => {
    console.log("getFilesFromEvent", e);
    return new Promise((resolve) => {
      getDroppedOrSelectedFiles(e).then((chosenFiles) => {
        resolve(chosenFiles.map((f) => f.fileObject));
      });
    });
  };
  selectFileInput = ({ accept, onFiles, files, getFilesFromEvent }) => {
    console.log("getFilesFromEvent_2", getFilesFromEvent);
    const textMsg = files.length > 0 ? "Upload Again" : "Upload Image";
    return (
      <label className="btn btn-danger mt-4">
        {textMsg}
        <input
          style={{ display: "none" }}
          type="file"
          accept={accept}
          multiple
          onChange={(e) => {
            getFilesFromEvent(e).then((chosenFiles) => {
              onFiles(chosenFiles);
            });
          }}
        />
      </label>
    );
  };
  handleChange_ImageSize(event)
  {
    // Updating the state variable
 
    this.setState({
      imagesize: event.target.value
    });

  }
  handleChange_ImageSize_Width(event)
  {
    this.setState({
      imagesize_width: event.target.value
    });
  }
  onEnterPress = (e) => {
    this.setState({ text: e.target.value });
  };
  TypeOfMeme = (e) => {
    this.setState({ memecount: Number(e.target.parentElement.className) });
  };
  // componentDidMount() method to fetch
  // images from the API
  componentDidMount() {
    
        this.setState({
          randomImg: require("../memeimages/moon.jpg")
        })
    this.setState({email_current_login:localStorage.getItem("MEME_LOGIN_EMAIL")})
  }

  // Method to change the value of input fields
  handleChange = (event) => {
    // Destructuring the event. target object
    const { name, value } = event.target;

    // Updating the state variable
    this.setState({
      [name]: value
    });
  };

  // Method to submit from and create meme
  handleSubmit = (event) => {
    event.preventDefault();
    //console.log("AllMeme", allMemeImgs);
    //console.log("rand", rand);
  };
  exportAsImage = async (el, imageFileName) => {
    const canvas = await html2canvas(el, { useCORS: true, allowTaint: false });
    const image = canvas.toDataURL("image/png", 1.0);
    this.downloadImage(image, imageFileName);
  };
  /*compress(string, encoding) {
    const byteArray = new TextEncoder().encode(string);
    const cs = new CompressionStream(encoding);
    const writer = cs.writable.getWriter();
    writer.write(byteArray);
    writer.close();
    return new Response(cs.readable).arrayBuffer();
  }
  */
  publish_image = async (el, imageFileName) => {
    const canvas = await html2canvas(el, { useCORS: true, allowTaint: false });
    const image = canvas.toDataURL("image/png", 1.0);

        
        console.log((image))
  
    //console.log("getcontext",image.toBlob())
    /*fetch('/publish_image', {
      method: "POST",
      headers:{"Content-Type": "application/json"},
      body:JSON.stringify({blob:image,email:localStorage.getItem("MEME_LOGIN_EMAIL")})
    }).then(function(response) {
      
      return response.json();
    }).then(function(data) {
      console.log(data);
    });
    */
  }
  downloadImage = (blob, fileName) => {
    const fakeLink = window.document.createElement("a");
    fakeLink.style = "display:none;";
    fakeLink.download = fileName;

    fakeLink.href = blob;
    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);

    fakeLink.remove();
  };
Logout()
{
  localStorage.removeItem("MEME_LOGIN_EMAIL")
  this.props.history.push({pathname:"/",state:{email:""}})
}
  render() {
    return (
      <div className="login" style={{ display: "flex", flexDirection: "column" }}>
        <div style={{display:"flex",flexDirection:"row",top:"10px",position:"absolute"}}>
        <h2 style={{background:"blue",color:"white",border:"blue",marginLeft:"270px" }}>Create your own meme's for free now</h2>
        {/*<button onClick={()=>this.publish_image(this.textInput.current, "test")} style={{background:"blue",color:"white",border:"blue",marginLeft:"40px"}}> Publish</button>*/}
        <button
                  onClick={() =>
                    this.exportAsImage(this.textInput.current, "test")
                  }
                  style={{background:"blue",color:"white",border:"blue",marginLeft:"30px" }}
                >
                  Download Image
                </button>
        <button onClick={this.Logout.bind(this)} style={{background:"blue",color:"white",border:"blue",marginLeft:"110px" }}> Logout</button>
                </div>
          <div>
   
        
            <div style={{ display: "flex", flexDirection: "row",marginLeft:"5%" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft:"10%"
                }}
              >
                <div  style={{
                  display: "flex",
                  flexDirection: "column",
                }}>
                <div
                  ref={this.textInput}
                  style={{  marginLeft: "100px",marginTop:"10px" }}
                >
                  <Card>
                    <CardHeader
                      title={this.state.topText}
                      style={{
                        textAlign: "center",
                        color: "yellow",
                        background: "black"
                      }}
                      titleTypographyProps={{ variant: "h7" }}
                    />

                    <CardMedia>
                      <img src={this.state.randomImg} style={{height:this.state.imagesize+"px",width:this.state.imagesize_width+"px"}}/>
                    </CardMedia>
                    <CardContent
                      style={{
                        textAlign: "center",
                        color: "yellow",
                        background: "black"
                      }}
                    >
                      {this.state.bottomText}
                    </CardContent>
                  </Card>
                </div>
                </div>
                <div className="dropzone" style={{display:"flex",flexDirection:"column"}}>
                <form className="meme-form" onSubmit={this.handleSubmit} style={{marginTop:"20%"}}>
                  <input
                    placeholder="Enter Top Text"
                    type="text"
                    value={this.state.topText}
                    name="topText"
                    onChange={this.handleChange}
                    style={{marginLeft:"10px"}}
                  />

                  <input
                    placeholder="Enter Bottom Text"
                    type="text"
                    value={this.state.bottomText}
                    name="bottomText"
                    onChange={this.handleChange}
                    style={{marginLeft:"10px"}}
                  />
              
                  <input
                    placeholder="Enter Image height(in px)"
                    type="text"
                    value={this.state.imagesize}
                    name="imagesize"
                    onChange={this.handleChange_ImageSize.bind(this)}
                    style={{marginLeft:"10px"}}
                  />
                  <input
                    placeholder="Enter Image width(in px)"
                    type="text"
                    value={this.state.imagesize_width}
                    name="imagesize"
                    onChange={this.handleChange_ImageSize_Width.bind(this)}
                    style={{marginLeft:"10px"}}
                  />
                </form>
                <div className="dropzone" style={{marginLeft:"10px"}}>
                <Dropzone
                  onSubmit={() =>
                    this.exportAsImage(this.textInput.current, "test")
                  }
                  onChangeStatus={this.onFileChange.bind(this)}
                  InputComponent={this.selectFileInput.bind(this)}
                  getUploadParams={this.fileParams.bind(this)}
                  getFilesFromEvent={this.getFilesFromEvent.bind(this)}
                  accept="image/*,audio/*,video/*"
                  minFiles={4}
                  inputContent="Add your meme"
                  styles={{
                    dropzone: { width: 440, height: 80 },
                    dropzoneActive: { borderColor: "green" }
                  }}
                />
              </div>
              </div>
              </div>
            </div>
          </div>
        
      </div>
    );
  }
}
