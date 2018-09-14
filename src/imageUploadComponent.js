// imports the React Javascript Library
import React from "react";
// imports the Icon, Button and Upload (reusable) components from ant design
import { Icon, Button, Upload, Radio, Row, Col, Input } from "antd";
import ReactDOM from "react-dom";

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSource: "computer",
      file: undefined,
      fileUploaded: false,
      fileReader: undefined
    };
    this.handleSourceChange = this.handleSourceChange.bind(this);
  }

  handleSourceChange(e) {
    this.setState({ imageSource: e.target.value });
  }

  renderSourceChoice() {
    const source = this.state.imageSource;
    return (
      <React.Fragment>
        <Radio.Group value={source} onChange={this.handleSourceChange}>
          <Radio.Button value="computer">Upload</Radio.Button>
          <Radio.Button value="url">URL</Radio.Button>
          <Radio.Button value="gallery" disabled={true}>
            Gallery
          </Radio.Button>
        </Radio.Group>
      </React.Fragment>
    );
  }

  processFile(file) {
    let reader = new FileReader();

    reader.onload = e => {
      this.setState({
        fileUploaded: true,
        file: file,
        fileReader: reader
      });
    };

    reader.readAsDataURL(file);
  }

  renderComputerUpload() {
    return (
      <React.Fragment>
        <div align="center">
          <React.Fragment>
            {!this.state.fileUploaded && (
              <React.Fragment>
                <br />
                <br />
                <Upload.Dragger
                  style={{
                    width: 0.4 * window.innerWidth,
                    maxwidth: 0.4 * window.innerWidth
                  }}
                  name="file"
                  accept=".jpg,.jpeg,.png"
                  beforeUpload={file => {
                    this.processFile(file);
                    return false;
                  }}
                >
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">
                    Click for file-chooser dialog or drag an image to this area.
                  </p>
                </Upload.Dragger>
              </React.Fragment>
            )}
            <table>
              <tbody>
                <tr>
                  <td>
                    <b>File:</b>
                  </td>
                  <td>
                    {this.state.file
                      ? `${this.state.file.name}`
                      : "(not uploaded)"}
                  </td>
                </tr>
              </tbody>
            </table>

            <br />
            <br />
            {this.state.fileUploaded && (
              <img
                src={this.state.fileReader.result}
                style={{
                  width: 0.4 * window.innerWidth,
                  maxwidth: 0.4 * window.innerWidth
                }}
              />
            )}
            <br />
            <br />
          </React.Fragment>
        </div>
      </React.Fragment>
    );
  }

  renderURLUpload() {
    const Search = Input.Search;
    return (
      <React.Fragment>
        {!this.state.fileUploaded && (
          <React.Fragment>
            <br />
            <br />
            <Search
              style={{
                width: 0.4 * window.innerWidth,
                maxwidth: 0.4 * window.innerWidth
              }}
              placeholder="Enter image URL"
              onSearch={value => console.log(value)}
              enterButton
            />
          </React.Fragment>
        )}
        <table>
          <tbody>
            <tr>
              <td>
                <b>File:</b>
              </td>
              <td>
                {this.state.file ? `${this.state.file.name}` : "(not uploaded)"}
              </td>
            </tr>
          </tbody>
        </table>

        <br />
        <br />
        {this.state.fileUploaded && (
          <img
            src={this.state.fileReader.result}
            style={{
              width: 0.4 * window.innerWidth,
              maxwidth: 0.4 * window.innerWidth
            }}
          />
        )}

        <br />
        <br />
        <br />
        <p>To be implemented.</p>
      </React.Fragment>
    );
  }

  renderGalleryUpload() {
    <React.Fragment>
      <p>To be implemented.</p>
    </React.Fragment>;
  }

  renderUpload() {
    if (this.state.imageSource === "computer")
      return <div>{this.renderComputerUpload()}</div>;
    else if (this.state.imageSource === "url")
      return <div>{this.renderURLUpload()}</div>;
    else if (this.state.imageSource === "gallery")
      return <div>{this.renderGalleryUpload()}</div>;
  }
  render() {
    return (
      <React.Fragment>
        <div>
          <Row type="flex" valign="top" align="center">
            {this.renderSourceChoice()}
          </Row>
          <Row type="flex" align="center">
            {" "}
            {this.renderUpload()}{" "}
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default ImageUpload;
