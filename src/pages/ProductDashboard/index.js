
import React, { useEffect, useState } from 'react'
import Layout from '../../components/global/layout'
import ApiClient from '../../methods/api/apiClient';
import datepipeModel from '../../models/datepipemodel';

export default function Productdashboard() {
  const [orders, setOrder] = useState([])
  const [filters, setFilter] = useState({ type: 'daily' })
  const [loading, setLoader] = useState()
  useEffect(() => {
    //  line chart
    Highcharts.chart('container', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Column chart with negative values'
      },
      xAxis: {
        categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        column: {
          borderRadius: '25%'
        }
      },
      series: [{
        name: 'John',
        data: [5, 3, 4, 7, 2]
      }, {
        name: 'Jane',
        data: [2, -2, -3, 2, 1]
      }, {
        name: 'Joe',
        data: [3, 4, 4, -2, 5]
      }]
    });
    //  Bubble Chart
    Highcharts.chart('bullbleChart', {
      chart: {
        type: 'bubble',
        plotBorderWidth: 1,
        zoomType: 'xy'
      },
      legend: {
        enabled: false
      },
      title: {
        text: 'Sugar and fat intake per country'
      },
      subtitle: {
        text: 'Source: <a href="http://www.euromonitor.com/">Euromonitor</a> and <a href="https://data.oecd.org/">OECD</a>'
      },
      accessibility: {
        point: {
          valueDescriptionFormat: '{index}. {point.name}, fat: {point.x}g, sugar: {point.y}g, obesity: {point.z}%.'
        }
      },
      xAxis: {
        gridLineWidth: 1,
        title: {
          text: 'Daily fat intake'
        },
        labels: {
          format: '{value} gr'
        },
        plotLines: [{
          color: 'black',
          dashStyle: 'dot',
          width: 2,
          value: 65,
          label: {
            rotation: 0,
            y: 15,
            style: {
              fontStyle: 'italic'
            },
            text: 'Safe fat intake 65g/day'
          },
          zIndex: 3
        }],
        accessibility: {
          rangeDescription: 'Range: 60 to 100 grams.'
        }
      },
      yAxis: {
        startOnTick: false,
        endOnTick: false,
        title: {
          text: 'Daily sugar intake'
        },
        labels: {
          format: '{value} gr'
        },
        maxPadding: 0.2,
        plotLines: [{
          color: 'black',
          dashStyle: 'dot',
          width: 2,
          value: 50,
          label: {
            align: 'right',
            style: {
              fontStyle: 'italic'
            },
            text: 'Safe sugar intake 50g/day',
            x: -10
          },
          zIndex: 3
        }],
        accessibility: {
          rangeDescription: 'Range: 0 to 160 grams.'
        }
      },
      tooltip: {
        useHTML: true,
        headerFormat: '<table>',
        pointFormat: '<tr><th colspan="2"><h3>{point.country}</h3></th></tr>' +
          '<tr><th>Fat intake:</th><td>{point.x}g</td></tr>' +
          '<tr><th>Sugar intake:</th><td>{point.y}g</td></tr>' +
          '<tr><th>Obesity (adults):</th><td>{point.z}%</td></tr>',
        footerFormat: '</table>',
        followPointer: true
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            format: '{point.name}'
          }
        }
      },
      series: [{
        data: [
          { x: 95, y: 95, z: 13.8, name: 'BE', country: 'Belgium' },
          { x: 86.5, y: 102.9, z: 14.7, name: 'DE', country: 'Germany' },
          { x: 80.8, y: 91.5, z: 15.8, name: 'FI', country: 'Finland' },
          { x: 80.4, y: 102.5, z: 12, name: 'NL', country: 'Netherlands' },
          { x: 80.3, y: 86.1, z: 11.8, name: 'SE', country: 'Sweden' },
          { x: 78.4, y: 70.1, z: 16.6, name: 'ES', country: 'Spain' },
          { x: 74.2, y: 68.5, z: 14.5, name: 'FR', country: 'France' },
          { x: 73.5, y: 83.1, z: 10, name: 'NO', country: 'Norway' },
          { x: 71, y: 93.2, z: 24.7, name: 'UK', country: 'United Kingdom' },
          { x: 69.2, y: 57.6, z: 10.4, name: 'IT', country: 'Italy' },
          { x: 68.6, y: 20, z: 16, name: 'RU', country: 'Russia' },
          { x: 65.5, y: 126.4, z: 35.3, name: 'US', country: 'United States' },
          { x: 65.4, y: 50.8, z: 28.5, name: 'HU', country: 'Hungary' },
          { x: 63.4, y: 51.8, z: 15.4, name: 'PT', country: 'Portugal' },
          { x: 64, y: 82.9, z: 31.3, name: 'NZ', country: 'New Zealand' }
        ],
        colorByPoint: true
      }]
    });
  });

  useEffect(() => {
    getDashboard()
  }, [])

  const getDashboard = () => {
    setLoader(true)
    ApiClient.get('api/user/dashboard', { ...filters }).then(res => {
      if (res.success) {
        if (res.totalOrders) {
          let data = res.totalOrders.map(itm => {
            return {
              x: datepipeModel.date(new Date((itm.year || 1), (itm.month || 1), (itm.day || 1))),
              y: itm.totalOrders
            }
          })
          setOrder(data)
        }
      }
      setLoader(false)
    })
  }

  return (
    <div>
      <Layout>
        <div className='conatiner'>
          <div className='d-flex justify-content-between border-bottom pb-3'>
            <h3 className='hedding '>Product</h3>
            <div class="selectDropdown">
              <div class="dropdown addDropdown">
                <button class="btn btn-primary dropdown-toggle removeBg w-100" type="button" id="dropdownMenuButtonstatusDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Time Frame</button>
                <div class="dropdown-menu shadow bg_hover leftAlignDrop" aria-labelledby="dropdownMenuButtonstatusDropdown">
                  <a class="dropdown-item">Select </a>
                  <a class="dropdown-item">time1</a>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 mt-3">
              <div className="sales_section">
                <div className="main_sales">
                  <div className="sales_headings">
                    <div>
                      <p className="sub_heading mb-0">Total earning</p>
                    </div>
                    <div>
                      <img src="/assets/img/bag.png" className="wallets_img" />
                    </div>
                  </div>
                  <div className="sales_icons">
                    <h3 className="Amount_sales">$ 22,880.50</h3>
                    <p className='mb-0'>Compared to $21,213 last year</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 mt-3">
              <div className="sales_section">
                <div className="main_sales">
                  <div className="sales_headings">
                    <div>
                      <p className="sub_heading mb-0">Sales</p>
                    </div>
                    <div>
                      <img
                        src="/assets/img/wallet.png"
                        className="wallets_img"
                      />
                    </div>
                  </div>
                  <div className="sales_icons">
                    <h3 className="Amount_sales">$ 8,768.00</h3>
                    <p className='mb-0'>Compared to $21,213 last year</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-12 mt-4'>
              <div className="shadow p-3 bg-white">
                <figure class="highcharts-figure">
                  <div id="container"></div>
                </figure>
              </div>
            </div>
            <div className='col-md-12 mt-4'>
              <div className="shadow p-3 bg-white">
                <figure class="highcharts-figure">
                  <div id="bullbleChart"></div>
                </figure>
              </div>
            </div>
          </div>
          <div className="table-responsive table_section">
            <table class="table table-striped">
              <thead className='table_head'>
                <tr className='heading_row'>
                  <th scope="col" className='table_data'>Booking System</th>
                  <th scope="col" className='table_data'>Connected On</th>
                  <th scope="col" className='table_data'>Connected By </th>
                  <th scope="col" className='table_data'>Status</th>
                  <th scope="col" className='table_data'>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className='data_row'>
                  <td className='table_dats'  >Rezdy</td>
                  <td className='table_dats'> December 10, 1815</td>
                  <td className='table_dats'  >John Doe</td>
                  <td className='table_dats'>
                    <div className='user_hours active'>
                      <span class="contract">Connected</span>
                    </div>
                  </td>
                  <td className='table_dats'>
                    <div className="action_icons">
                      <span className='edit_icon mr-0'>
                        <i class="material-icons delete" title='Refresh'> refresh</i>
                      </span>
                      <span className='edit_icon ml-1 mr-1'>
                        <i class="material-icons delete" title='Delete'> delete</i>
                      </span>
                      <a className="edit_icon"  >
                        <i class="material-icons edit" title="Edit">edit</i>
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </div>
  )
}
