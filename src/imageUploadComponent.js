// imports the React Javascript Library
import React from "react";
// imports the Icon, Button and Upload (reusable) components from ant design
import {
  Icon,
  Button,
  Upload,
  Radio,
  Row,
  Col,
  Input,
  Card,
  Avatar
} from "antd";
import ReactDOM from "react-dom";

class ImageUploadCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      key: "upload",
      file: undefined,
      fileUploaded: false,
      fileReader: undefined,
      filename: undefined
    };

    this.handleResetAction = this.handleResetAction.bind(this);
  }

  onTabChange = (key, type) => {
    this.setState({
      [type]: key,
      file: undefined,
      fileUploaded: false,
      fileReader: undefined,
      filename: undefined
    });
  };

  handleResetAction() {
    this.setState({
      fileUploaded: false,
      file: undefined,
      fileReader: undefined,
      filename: undefined
    });
  }

  processFile(file) {
    let reader = new FileReader();

    reader.onload = e => {
      this.setState({
        fileUploaded: true,
        file: file,
        fileReader: reader,
        filename: file.name
      });
    };

    reader.readAsDataURL(file);
  }

  renderUploadContent() {
    return (
      <React.Fragment>
        <div align="center">
          <React.Fragment>
            {!this.state.fileUploaded &&
              this.state.key == "upload" && (
                <React.Fragment>
                  <br />
                  <br />
                  <Upload.Dragger
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%"
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
                      Click for file-chooser dialog or drag an image to this
                      area.
                    </p>
                  </Upload.Dragger>
                </React.Fragment>
              )}
            {this.state.fileUploaded &&
              this.state.key == "upload" && (
                <img
                  src={this.state.fileReader.result}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%"
                  }}
                />
              )}

            <Row>
              <br />
              <b>File: </b>
              {this.state.file ? `${this.state.file.name}` : "(not uploaded)"}
            </Row>
          </React.Fragment>
        </div>
      </React.Fragment>
    );
  }

  handleURLSearch(value) {
    var filename = value.substring(value.lastIndexOf("/") + 1);
    console.log(filename);
    this.setState({
      fileUploaded: true,
      file: value,
      fileReader: undefined,
      filename: filename
    });
  }

  renderURLContent() {
    const Search = Input.Search;
    return (
      <React.Fragment>
        {!this.state.fileUploaded && (
          <React.Fragment>
            <br />
            <br />
            <Search
              style={{
                maxWidth: "100%"
              }}
              placeholder="Enter image URL"
              onSearch={value => this.handleURLSearch(value)}
              enterButton
            />
          </React.Fragment>
        )}

        {this.state.fileUploaded && (
          <img
            src={this.state.file}
            style={{
              maxWidth: "100%",
              maxHeight: "100%"
            }}
          />
        )}

        <Row>
          <br />
          <b>File: </b>
          {this.state.file ? `${this.state.filename}` : "(not uploaded)"}
        </Row>
      </React.Fragment>
    );
  }

  handleAvatarClick(value) {
    var filename = value.url.substring(value.url.lastIndexOf("/") + 1);
    console.log(filename);
    this.setState({
      fileUploaded: true,
      file: value.url,
      fileReader: undefined,
      filename: filename
    });
  }

  renderGalleryContent() {
    const listItems = this.props.galleryImageList.map(url => (
      <div
        onClick={value => this.handleAvatarClick({ url })}
        style={{
          padding: "5px 5px 5px 5px",
          cursor: "pointer"
        }}
      >
        <Avatar shape="square" size={100} src={url} />
      </div>
    ));

    return (
      <React.Fragment>
        {!this.state.fileUploaded &&
          this.state.key == "gallery" && (
            <Row type="flex" justify="space-between">
              {listItems}
            </Row>
          )}
        {this.state.fileUploaded &&
          this.state.key == "gallery" && (
            <img
              src={this.state.file}
              style={{
                maxWidth: "100%",
                maxHeight: "100%"
              }}
            />
          )}
        <Row>
          <br />
          <b>File: </b>
          {this.state.file ? `${this.state.filename}` : "(not uploaded)"}
        </Row>
      </React.Fragment>
    );
  }

  render() {
    const tabList = [
      {
        key: "upload",
        tab: "Upload"
      },
      {
        key: "url",
        tab: "URL"
      },
      {
        key: "gallery",
        tab: "Gallery"
      }
    ];

    const contentList = {
      upload: this.renderUploadContent(),
      url: this.renderURLContent(),
      gallery: this.renderGalleryContent()
    };

    return (
      <div>
        <Card
          style={{ width: "100%" }}
          title={<b>{this.props.cardTitle}</b>}
          tabList={tabList}
          actions={[
            <Icon
              type="undo"
              theme="outlined"
              onClick={this.handleResetAction}
            />
          ]}
          activeTabKey={this.state.key}
          onTabChange={key => {
            this.onTabChange(key, "key");
          }}
        >
          {contentList[this.state.key]}
        </Card>
      </div>
    );
  }
}

export { ImageUploadCard };
