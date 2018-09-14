// imports the React Javascript Library
import React from "react";
// imports the Icon, Button and Upload (reusable) components from ant design
import {
  Layout,
  Popover,
  Icon,
  Button,
  Input,
  Upload,
  Radio,
  Table,
  Row,
  Col,
  Collapse,
  Switch
} from "antd";
import ReactDOM from "react-dom";
import ImageUpload from "./imageUploadComponent";
import "antd/dist/antd.css";

const { Header, Footer, Sider, Content } = Layout;
const Panel = Collapse.Panel;

// class ClassName extends React.Component { ... } export default ClassName;
// class creates a javascript class
// ClassName is the name of such class
// extends the Component class of the React library : ClassName is a child of Component (defined in React)
class StyleTransfer extends React.Component {
  // The constructor method is a special method for creating and initializing an object created within a class
  // props : properties object
  constructor(props) {
    // calls the constructor of a parent class.
    super(props);

    this.submitAction = this.submitAction.bind(this);
    this.state = {
      fileUploaded: false,
      file: undefined,
      fileReader: undefined,
      size: "large"
    };

    this.MethodhandleChange = this.MethodhandleChange.bind(this);
    this.ModelhandleChange = this.ModelhandleChange.bind(this);
    this.MethodHandleSwitchChange = this.MethodHandleSwitchChange.bind(this);
  }

  isComplete() {
    if (this.props.jobResult === undefined) return false;
    else {
      return true;
    }
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

  submitAction() {
    this.props.showModalCallback(this.props.callModal);
    this.props.callApiCallback(this.state.method_value, {
      model: this.state.model_value,
      img_path: this.state.fileReader.result.split(",")[1]
    });
  }

  MethodhandleChange(event) {
    this.setState({ method_value: event.target.value });
  }

  ModelhandleChange(event) {
    this.setState({ model_value: event.target.value });
  }

  MethodHandleSwitchChange(checked) {
    console.log(`switch to ${checked}`);
  }

  renderForm() {
    const PopoverStartFromRandomText = (
      <div style={{ width: 0.15 * window.innerWidth }}>
        <p align="justify">
          Toggle to start from a randomly generated image instead of the content
          image.
        </p>
      </div>
    );

    const PopoverOutputImageSizeText = (
      <div style={{ width: 0.15 * window.innerWidth }}>
        <p align="justify">
          Define the dimensions of the output image (size x size).
        </p>
      </div>
    );

    const PopoverOptimizationRoundsText = (
      <div style={{ width: 0.15 * window.innerWidth }}>
        <p align="justify">Choose the number of optimization rounds.</p>
      </div>
    );

    const PopoverOptimizationIterationsText = (
      <div style={{ width: 0.15 * window.innerWidth }}>
        <p align="justify">Choose the number of optimization iterations.</p>
      </div>
    );

    return (
      <React.Fragment>
        <div align="center">
          <br />
          <div>
            <p align="center">
              A service that transfers the style of an image to another.
            </p>
          </div>
          <br />
          <React.Fragment>
            <div>
              <table style={{ width: 0.9 * window.innerWidth, border: 5 }}>
                <tbody>
                  <tr>
                    <td align="center"> Content Image </td>
                    <td align="center"> Style Image </td>
                  </tr>
                  <tr>
                    <td align="center">
                      {" "}
                      <ImageUpload />{" "}
                    </td>
                    <td align="center">
                      {" "}
                      <ImageUpload />{" "}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </React.Fragment>
          <React.Fragment>
            <Collapse bordered={false}>
              <Panel
                header="Advanced Parameters"
                key="1"
                style={{ width: 0.9 * window.innerWidth, border: 5 }}
              >
                <Row type="flex" justify="space-around" align="middle">
                  <Popover content={PopoverStartFromRandomText}>
                    <Col>
                      Start from random
                      <br />
                      <Switch
                        defaultChecked
                        onChange={this.MethodHandleSwitchChange}
                      />
                    </Col>
                  </Popover>
                  <Popover content={PopoverOutputImageSizeText}>
                    <Col>
                      Output Image Size
                      <br />
                      <Input
                        defaultValue="300"
                        style={{ width: "60px", textAlign: "center" }}
                      />
                    </Col>
                  </Popover>
                  <Popover content={PopoverOptimizationRoundsText}>
                    <Col>
                      Optimization Rounds
                      <br />
                      <Input
                        defaultValue="10"
                        style={{ width: "40px", textAlign: "center" }}
                      />
                    </Col>
                  </Popover>
                  <Popover content={PopoverOptimizationIterationsText}>
                    <Col>
                      Optimization Iterations
                      <br />
                      <Input
                        defaultValue="20"
                        style={{ width: "40px", textAlign: "center" }}
                      />
                    </Col>
                  </Popover>
                </Row>
              </Panel>
            </Collapse>
          </React.Fragment>

          <Button
            type="primary"
            onClick={() => {
              this.submitAction();
            }}
            disabled={!this.state.fileUploaded}
          >
            Call Agent API
          </Button>
        </div>
      </React.Fragment>
    );
  }

  renderComplete() {
    let jsonResult = this.props.jobResult["result"];
    let delta_time = jsonResult["delta_time"];
    if (delta_time === undefined) delta_time = "-1";
    let jsonTop5 = jsonResult["top_5"];
    if (jsonTop5 === undefined) jsonTop5 = { "-1": jsonResult };
    let arr = [];
    Object.keys(jsonTop5).forEach(function(key) {
      arr.push(key);
    });

    return (
      <div>
        <div>
          <p align="center">
            A service that transfers the style of an image to another.
          </p>
        </div>
        <br />
        <br />
        <div>
          <ul>
            {arr.map(item => (
              <Json2List key={item} label={item} value={jsonTop5[item]} />
            ))}
          </ul>
          Execution time: {delta_time}s
        </div>
      </div>
    );
  }

  renderHeader() {
    return (
      <div>
        <Row type="flex">
          <Col span={2} align="left">
            <img
              src="http://alpha.singularitynet.io/img/logo.svg"
              alt="logo"
              style={{ width: 100, height: 40 }}
            />
          </Col>
          <Col span={19} align="center">
            <h2 valign="bottom" style={{ color: "white", fontWeight: "bold" }}>
              Artistic Style Transfer
            </h2>
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    if (this.isComplete())
      return (
        <div>
          <Layout>
            <Header style={{ backgroundColor: "#230D3A" }}>
              {this.renderHeader()}
            </Header>
            <Content>{this.renderComplete()}</Content>
          </Layout>
        </div>
      );
    else
      return (
        <div>
          <Layout>
            <Header style={{ backgroundColor: "#230D3A" }}>
              {this.renderHeader()}
            </Header>
            <Content>{this.renderForm()}</Content>
          </Layout>
        </div>
      );
  }
}

class Json2List extends React.Component {
  render() {
    return <li>{this.props.label + " - " + this.props.value}</li>;
  }
}

//render (StyleTransfer, document.getElementById("app"));
ReactDOM.render(<StyleTransfer />, document.getElementById("app"));
