import React from 'react'
import ReactDom from 'react-dom'
import {Line} from 'react-chartjs-2'
import {MDBContainer} from 'mdbreact'

class Graphique extends React.Component {
    state = {
        dataLine: {
            labels: this.props.labels,
            datasets: [
                {
                    label: this.props.labeldata,
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: "rgba(225, 204,230, .5)",
                    borderColor: "rgb(205, 130, 158)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgb(205, 130,1 58)",
                    pointBackgroundColor: "rgb(255, 255, 255)",
                    pointBorderWidth: 10,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgb(0, 0, 0)",
                    pointHoverBorderColor: "rgba(220, 220, 220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.props.data
                }]
        }
    }

    render() {
        return (
            <div>
            <MDBContainer>
                <h3 className="mt-5">Line chart</h3>
                <Line data={this.state.dataLine} options={{responsive: true}}/>
            </MDBContainer>
        </div>
        )
    }
}

export default Graphique