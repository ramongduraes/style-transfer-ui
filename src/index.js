import React from "react";
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
  Switch,
  Card
} from "antd";
import ReactDOM from "react-dom";
import { ImageUploadCard } from "./imageUploadComponent";
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

    this.ModelhandleChange = this.ModelhandleChange.bind(this);
    this.MethodHandleSwitchChange = this.MethodHandleSwitchChange.bind(this);
  }

  paramsList = [
    {
      key: "startFromRandom",
      text: "Start From Random",
      default: true,
      input: <Switch defaultChecked onChange={this.MethodHandleSwitchChange} />,
      popoverText: (
        <p align="center" style={{ width: 0.13 * window.innerWidth }}>
          Toggle to start from a randomly generated image instead of the content
          image.
        </p>
      ),
      popoverStyle: { width: 0.13 * window.innerWidth }
    }
  ];

  galleryImageList = [
    "https://raw.githubusercontent.com/dxyang/StyleTransfer/master/style_imgs/mosaic.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    "https://raw.githubusercontent.com/ShafeenTejani/fast-style-transfer/master/examples/dora-maar-picasso.jpg",
    "https://pbs.twimg.com/profile_images/925531519858257920/IyYLHp-u_400x400.jpg",
    "https://raw.githubusercontent.com/ShafeenTejani/fast-style-transfer/master/examples/dog.jpg",
    "http://r.ddmcdn.com/s_f/o_1/cx_462/cy_245/cw_1349/ch_1349/w_720/APL/uploads/2015/06/caturday-shutterstock_149320799.jpg"
  ];

  renderHeader() {
    return (
      <div>
        <Row type="flex">
          <Col span={1} align="left">
            <img
              src="http://alpha.singularitynet.io/img/logo.svg"
              alt="logo"
              style={{ width: 100, height: 40 }}
            />
          </Col>
          <Col span={23} align="center">
            <h2 valign="bottom" style={{ color: "white", fontWeight: "bold" }}>
              Artistic Style Transfer
            </h2>
          </Col>
        </Row>
      </div>
    );
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

  renderParamters() {
    var paramsList = [
      {
        key: "startFromRandom",
        text: "Start From Random",
        default: true,
        input: (
          <Switch defaultChecked onChange={this.MethodHandleSwitchChange} />
        ),
        popoverText: (
          <p align="center" style={{ width: 0.13 * window.innerWidth }}>
            Toggle to start from a randomly generated image instead of the
            content image.
          </p>
        )
      },
      {
        key: "outputImageSize",
        text: "Output Image Size",
        default: 300,
        input: (
          <Input
            defaultValue="300"
            style={{ width: "60px", textAlign: "center" }}
          />
        ),
        popoverText: (
          <p align="center" style={{ width: 0.15 * window.innerWidth }}>
            Define the dimensions of the output image (size x size).
          </p>
        )
      },
      {
        key: "optimizationRounds",
        text: "Optimization Rounds",
        default: 10,
        input: (
          <Input
            defaultValue="10"
            style={{ width: "40px", textAlign: "center" }}
          />
        ),
        popoverText: (
          <p align="center" style={{ width: 0.1 * window.innerWidth }}>
            Choose the number of optimization rounds.
          </p>
        )
      },
      {
        key: "optimizationIterations",
        text: "Optimization Iterations",
        default: 20,
        input: (
          <Input
            defaultValue="20"
            style={{ width: "40px", textAlign: "center" }}
          />
        ),
        popoverText: (
          <p align="center" style={{ width: 0.1 * window.innerWidth }}>
            Choose the number of optimization iterations per round.
          </p>
        )
      }
    ];

    //var parameters = []

    //const testlistParams = paramsList.map((param, this.parameters) => (
    //  parameters.push(param.key) ));

    const listParams = paramsList.map(param => (
      <Popover content={param.popoverText} style={param.popoverStyle}>
        <Col>
          {param.text}
          <br />
          {param.input}
        </Col>
      </Popover>
    ));

    /* Code for parameter columns
    const PopoverStartFromRandomText = (
      <div >
        <p align="center" style={{ width: 0.13 * window.innerWidth }}>
          Toggle to start from a randomly generated image instead of the content
          image.
        </p>
      </div>
    );

    const PopoverOutputImageSizeText = (
      <div style={{ width: 0.15 * window.innerWidth }}>
        <p align="center">
          Define the dimensions of the output image (size x size).
        </p>
      </div>
    );

    const PopoverOptimizationRoundsText = (
      <div style={{ width: 0.1 * window.innerWidth }}>
        <p align="center">Choose the number of optimization rounds.</p>
      </div>
    );

    const PopoverOptimizationIterationsText = (
      <div style={{ width: 0.1 * window.innerWidth }}>
        <p align="center">
          Choose the number of optimization iterations per round.
        </p>
      </div>
    ); */

    /* Code for parameter columns
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
      </Popover>*/

    function handleResetParams() {}

    return (
      <Collapse bordered={false}>
        <Panel
          header={
            <h3>
              <b>Parameters</b>
            </h3>
          }
          key="1"
        >
          <Card
            actions={[
              <Icon
                type="undo"
                theme="outlined"
                onClick={handleResetParams()}
              />
            ]}
          >
            <Row type="flex" justify="space-around" align="middle">
              {listParams}
            </Row>
          </Card>
        </Panel>
      </Collapse>
    );
  }

  ModelhandleChange(event) {
    this.setState({ model_value: event.target.value });
  }

  MethodHandleSwitchChange(checked) {
    console.log(`switch to ${checked}`);
  }

  renderText() {
    return (
      <Row type="flex" justify="center">
        <br />
        <p align="center">
          Transfer the style of a <b>style image</b> to a <b>content image</b>{" "}
          by choosing them in the boxes below. You can <b>upload</b> a file from
          your computer, from a <b>URL</b> or pick one of the images available
          in the <b>gallery</b>.
        </p>
        <p align="center">
          You can specify additional <b>parameters</b> in the panel below the
          image uploading area. Place the mouse over each parameter for a brief
          explanation.
        </p>
      </Row>
    );
  }

  renderContent() {
    return (
      <React.Fragment>
        <Row type="flex" justify="center">
          <Col span={11}>
            <ImageUploadCard
              cardTitle="Content Image"
              galleryImageList={this.galleryImageList}
            />
          </Col>
          <Col span={11}>
            <ImageUploadCard
              cardTitle="Style Image"
              galleryImageList={this.galleryImageList}
            />{" "}
          </Col>
        </Row>
        <Row type="flex" justify="space-around">
          <Col span={22}>{this.renderParamters()}</Col>
        </Row>
        <br />
        <Row>
          <div align="center">
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
        </Row>
        <br />
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
        <br />
        <ul>
          {arr.map(item => (
            <Json2List key={item} label={item} value={jsonTop5[item]} />
          ))}
        </ul>
        Execution time: {delta_time}s
      </div>
    );
  }

  // Relevant color codes:
  // Ant Design's primary blue #20AAF8
  // SingularityNET-Alpha's purple #230D3A
  // Light blue #beecff
  render() {
    return (
      <div align="center">
        <Layout>
          <Header style={{ backgroundColor: "#20AAF8" }}>
            {this.renderHeader()}
          </Header>
          <Content style={{ backgroundColor: "#FFFFFF" }}>
            {this.renderText()}
            {!this.isComplete() && this.renderContent()}
            {this.isComplete() && this.renderComplete()}
          </Content>
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

ReactDOM.render(<StyleTransfer />, document.getElementById("app"));
