
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Layout from '../../components/global/layout'
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import datepipeModel from '../../models/datepipemodel';

export default function Salesdashboard() {
  const [sales, setsales] = useState([])
  const [earning, setearning] = useState()
  const [orderslist, setOrderlist] = useState([])
  const [orderTotal, setOrderTotal] = useState(0)
  const [filters, setFilter] = useState({ page: 1, count: 50 })
  const [chartFilter, setChartFilter] = useState({ type: 'daily' })
  const [loading, setLoader] = useState()
  const history = useHistory()
  useEffect(() => {


    Highcharts.chart('container', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Sales Figures',
        align: 'left'
      },

      xAxis: {
        categories: [
          ...sales.map(itm => {
            return itm.x
          })
        ]
      },

      yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
          text: 'Total Orders'
        }
      },

      tooltip: {
        format: '<b>{key}</b><br/>{series.name}: {y}<br/>' +
          'Total: {point.stackTotal}'
      },

      plotOptions: {
        column: {
          stacking: 'normal'
        }
      },

      series: [{
        name: 'Orders',
        data: [
          ...sales.map(itm => {
            return itm.y
          })
        ],
        color: '#775DA6',
        stack: 'Europe'
      },
        // {
        //     name: 'Unique Users',
        //     data: [
        //       ...sales.map(itm => {
        //         return itm.y
        //       })
        //     ],
        //     stack: 'Europe'
        // }
      ]
    });

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
        text: 'Sales Figures'
      },

      subtitle: {
        text: ''
      },

      accessibility: {
        point: {
          valueDescriptionFormat: '{index}. {point.name}, fat: {point.x}g, sugar: {point.y}g, obesity: {point.z}%.'
        }
      },

      xAxis: {
        gridLineWidth: 1,
        categories: [
          ...sales.map(itm => {
            return itm.x
          })
        ],
        title: {
          text: 'Dates'
        },
        labels: {
          format: '{value}'
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
          text: 'Total Orders'
        },
        labels: {
          format: '{value}'
        },
        maxPadding: 0.2,
        // plotLines: [{
        //   color: 'black',
        //   dashStyle: 'dot',
        //   width: 2,
        //   value: 50,
        //   label: {
        //     align: 'right',
        //     style: {
        //       fontStyle: 'italic'
        //     },
        //     text: 'Safe sugar intake 50g/day',
        //     x: -10
        //   },
        //   zIndex: 3
        // }],
        accessibility: {
          rangeDescription: 'Range: 0 to 160 grams.'
        }
      },

      tooltip: {
        useHTML: true,
        headerFormat: '<table>',
        pointFormat: '<tr><th colspan="2"><h5>{point.category}</h5></th></tr>' +
          '<tr><th>Total:</th><td>{point.y}</td></tr>'
          ,
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
          ...sales.map((itm,i)=>{
            return { x:i, y: itm.y, z: 100, name: itm.x,category:itm.x }
          })
          // { x: 71, y: 93.2, z: 24.7, name: 'UK', country: 'United Kingdom' },
          // { x: 69.2, y: 57.6, z: 10.4, name: 'IT', country: 'Italy' },
          // { x: 68.6, y: 20, z: 16, name: 'RU', country: 'Russia' },
          // { x: 65.5, y: 126.4, z: 35.3, name: 'US', country: 'United States' },
          // { x: 65.4, y: 50.8, z: 28.5, name: 'HU', country: 'Hungary' },
          // { x: 63.4, y: 51.8, z: 15.4, name: 'PT', country: 'Portugal' },
          // { x: 64, y: 82.9, z: 31.3, name: 'NZ', country: 'New Zealand' }
        ],
        colorByPoint: true
      }]

    });

  });

  useEffect(() => {
    getDashboard()
    getOrders()
  }, [])

  const getOrders = (p = {}) => {
    setLoader(true)
    let filter = { ...filters, ...p }
    ApiClient.get('api/orders', filter).then(res => {
      if (res.success) {
        setOrderlist(res.data)
        setOrderTotal(res.total)
      }
      setLoader(false)
    })
  }

  const getDashboard = () => {
    loader(true)
    ApiClient.get('api/user/dashboard', { ...chartFilter }).then(res => {
      if (res.success) {
        setearning(res)
        if (res.totalSales) {
          let data = res.totalSales.map(itm => {
            return {
              x: datepipeModel.date(new Date((itm.year || 1), (itm.month || 1), (itm.day || 1))),
              y: itm.totalSale
            }
          })
          setsales(data)
        }
      }
      loader(false)
    })
  }

  const vieworder = (id) => {
    history.push("/dashboard/orderdetail/" + id)
  }

  const route = (r) => {
    history.push(r)
  }

  return (
    <div>
      <Layout>
        <div className='conatiner'>
          <div className='d-flex justify-content-between border-bottom pb-3'>
            <h3 className='hedding '>Sales</h3>
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
                    <h3 className="Amount_sales">{earning?.totalEarning}
                      <span className='grenn_persentage'><i class="fa fa-caret-up" aria-hidden="true"></i> 10%</span>
                    </h3>
                    <p className='mb-0'>Compared to {earning?.totalEarning} last year</p>
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
                    <h3 className="Amount_sales">{earning?.totalSale}
                    <span className='grenn_persentage'><i class="fa fa-caret-up" aria-hidden="true"></i> 12%</span>
                    </h3>
                    <p className='mb-0'>Compared to {earning?.totalSale} last year</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12 mt-4">
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
        </div>
      </Layout>
    </div>
  )
}
