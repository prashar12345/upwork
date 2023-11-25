
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Layout from '../../components/global/layout'
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import methodModel from '../../methods/methods';
import datepipeModel from '../../models/datepipemodel';
import "./style.scss";

export default function Dashboard() {
  const [orders, setOrder] = useState([])
  const [data, setdata] = useState()
  const [orderslist, setOrderlist] = useState([])
  const [orderTotal, setOrderTotal] = useState(0)
  const [filters, setFilter] = useState({ page: 1, count: 50 })
  const [chartFilter, setChartFilter] = useState({ type: 'daily' })
  const [loading, setLoader] = useState()
  const history=useHistory()
  useEffect(() => {
    Highcharts.chart('container', {
      chart: {
          type: 'areaspline'
      },
      title: {
          text: '',
          align: 'left'
      },
      subtitle: {
          text: 'Source: <a href="https://www.ssb.no/jord-skog-jakt-og-fiskeri/jakt" target="_blank">SSB</a>',
          align: 'left'
      },
      legend: {
          layout: 'vertical',
          align: 'left',
          verticalAlign: 'top',
          x: 120,
          y: 70,
          floating: true,
          borderWidth: 1,
          backgroundColor:
              Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
      },
      xAxis: {
          plotBands: [{ // Highlight the two last years
              from: 2019,
              to: 2020,
              color: 'rgba(68, 170, 213, .2)'
          }]
      },
      yAxis: {
          title: {
              text: 'Quantity'
          }
      },
      tooltip: {
          shared: true,
          headerFormat: '<b>Hunting season starting autumn {point.x}</b><br>'
      },
      credits: {
          enabled: false
      },
      plotOptions: {
          series: {
              pointStart: 2000
          },
          areaspline: {
              fillOpacity: 0.5
          }
      },
      series: [{
          name: 'Moose',
          data:
              [
                  38000,
                  37300,
                  37892,
                  38564,
                  36770,
                  36026,
                  34978,
                  35657,
                  35620,
                  35971,
                  36409,
                  36435,
                  34643,
                  34956,
                  33199,
                  31136,
                  30835,
                  31611,
                  30666,
                  30319,
                  31766
              ]
      }, {
          name: 'Deer',
          data:
              [
                  22534,
                  23599,
                  24533,
                  25195,
                  25896,
                  27635,
                  29173,
                  32646,
                  35686,
                  37709,
                  39143,
                  36829,
                  35031,
                  36202,
                  35140,
                  33718,
                  37773,
                  42556,
                  43820,
                  46445,
                  50048
              ]
      }]
  });

    // second chart

    const colors = Highcharts.getOptions().colors,
      categories = [
        'Orders',
        'Products'
      ],
      data = [
        {
          y: 61.04,
          color: colors[1],
          drilldown: {
            name: 'Other',
            categories: [
              'Orders',
              'Products',

            ],
            data: [
              36.89,
              18.16,
            ]
          }
        },

      ],
      browserData = [],
      versionsData = [],
      dataLen = data.length;

    let i,
      j,
      drillDataLen,
      brightness;


    // Build the data arrays
    for (i = 0; i < dataLen; i += 1) {

      // add browser data
      browserData.push({
        name: categories[i],
        y: data[i].y,
        color: data[i].color
      });

      // add version data
      drillDataLen = data[i].drilldown.data.length;
      for (j = 0; j < drillDataLen; j += 1) {
        brightness = 0.2 - (j / drillDataLen) / 5;
        versionsData.push({
          name: data[i].drilldown.categories[j],
          y: data[i].drilldown.data[j],
          color: Highcharts.color(data[i].color).brighten(brightness).get()
        });
      }
    }

    // Create the chart
    Highcharts.chart('barChart', {
      chart: {
        type: 'pie'
      },
      title: {
        text: '',
        align: 'left'
      },
      subtitle: {
        text: 'Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>',
        align: 'left'
      },
      plotOptions: {
        pie: {
          shadow: false,
          center: ['50%', '50%']
        }
      },
      tooltip: {
        valueSuffix: '%'
      },
      series: [{
        name: 'Versions',
        data: versionsData,
        size: '80%',
        innerSize: '60%',
        dataLabels: {
          format: '<b>{point.name}:</b> <span style="opacity: 0.5">{y}%</span>',
          filter: {
            property: 'y',
            operator: '>',
            value: 1
          },
          style: {
            fontWeight: 'normal'
          }
        },
        id: 'versions'
      }],
      responsive: {
        rules: [{
          condition: {
            maxWidth: 400
          },
          chartOptions: {
            series: [{
            }, {
              id: 'versions',
              dataLabels: {
                enabled: false
              }
            }]
          }
        }]
      }
    });

  });

  useEffect(() => {
    // getDashboard()
    // getOrders()
  }, [])


  // const getOrders = (p = {}) => {
  //   setLoader(true)
  //   let filter = { ...filters, ...p }
  //   ApiClient.get('api/orders', filter).then(res => {
  //     if (res.success) {
  //       setOrderlist(res.data)
  //       setOrderTotal(res.total)
  //     }
  //     setLoader(false)
  //   })
  // }

  // const getDashboard = () => {
  //   loader(true)
  //   ApiClient.get('api/user/dashboard', { ...chartFilter }).then(res => {
  //     if (res.success) {
  //       setdata(res)
  //       if (res.totalOrders) {
  //         let data = res.totalOrders.map(itm => {
  //           return {
  //             x: datepipeModel.date(new Date((itm.year || 1), (itm.month || 1), (itm.day || 1))),
  //             y: itm.totalOrders
  //           }
  //         })
  //         setOrder(data)
  //       }
  //     }
  //     loader(false)
  //   })
  // }

  const vieworder=(id)=>{
    history.push("/dashboard/orderdetail/"+id)
  }


  const route=(r)=>{
    history.push(r)
  }



  return (
    <div>
      <Layout>

        <div className='conatiner'>
          <h1>Dashboard</h1>

          <div className="row">
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-3 mt-3">
              <div className="sales_section">
                <div className="main_sales">
                  <div className="sales_headings">
                    <div>
                      <p className="sub_heading">Total earning</p>
                    </div>
                    <div>
                      <img src="/assets/img/bag.png" className="wallets_img" />
                    </div>
                  </div>
                  <div className="sales_icons">
                    <h3 className="Amount_sales">5000</h3>
                  </div>
                </div>
              </div>
            </div>
        
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-3 mt-3">
              <div className="sales_section">
                <div className="main_sales">
                  <div className="sales_headings">
                    <div>
                      <p className="sub_heading">Sales</p>
                    </div>
                    <div>
                      <img
                        src="/assets/img/wallet.png"
                        className="wallets_img"
                      />
                    </div>
                  </div>
                  <div className="sales_icons">
                    <h3 className="Amount_sales">6770</h3>
                  </div>
                </div>
              </div>
            </div>
            <br/>
            <div className="col-12 col-sm-12  col-xl-3 mt-3">
              <div className="sales_section">
                <div className="main_sales pointer" onClick={e=>route('/dashboard/orders')}>
                  <div className="sales_headings">
                    <div>
                      <p className="sub_heading">Total Orders</p>
                    </div>
                    <div>
                      <img src="/assets/img/send.png" className="wallets_img" />
                    </div>
                  </div>
                  <div className="sales_icons">
                    <h3 className="Amount_sales">7856</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 mt-4">
              <div className="shadow p-3 bg-white">
                <figure class="highcharts-figure">
                  <div id="container"></div>
                </figure>
              </div>
            </div>

            <div className="col-md-6 mt-4">
              <div className="shadow p-3 bg-white">
                <figure class="highcharts-figure">
                  <div id="barChart"></div>
                </figure>
              </div>
            </div>

          </div>

          <div className="table-responsive table_section">

            {/* <table class="table table-striped">
              <thead className='table_head'>
                <tr className='heading_row'>
                  <th scope="col" className='table_data'>Customer</th>
                  <th scope="col" className='table_data'>Items</th>
                  <th scope="col" className='table_data'>Commission</th>
                  <th scope="col" className='table_data'>Supplier Name</th>
                  <th scope="col" className='table_data'>Total Amount</th>
                  <th scope="col" className='table_data'>Status</th>
                </tr>
              </thead>
              <tbody>
                {!loading && orderslist && orderslist.map((itm, i) => {
                  return <tr className='data_row'>
                    <td className='table_dats' onClick={e => vieworder(itm.id)}>
                      <div className='user_detail'>
                        <img src={methodModel.userImg(itm.customer.image)} className="user_imgs" />

                        <div className='user_name'>
                          <h4 className='user'>
                            {itm.customer.name}
                          </h4>
                          <p className='user_info'>
                            {itm.customer.phone}
                          </p>
                        </div>
                      </div></td>
                    <td className='table_dats' onClick={e => vieworder(itm.id)}>{itm?.items?.length ? <>
                      {itm.items.map(pitm => {
                        return <span className='badge badge-primary m-1'>{pitm.productName}</span>
                      })}<span></span>
                    </> : <></>}</td>
                    <td className='table_dats' onClick={e => vieworder(itm.id)}>{itm.commission}</td>
                    <td className='table_dats' onClick={e => vieworder(itm.id)}>{itm.supplierName}</td>
                    <td className='table_dats' onClick={e => vieworder(itm.id)}>{itm.totalAmount} {itm.totalCurrency}</td>

                    <td className='table_dats'> <div className={`user_hours ${itm.status}`}>
                      <span className='contract'>
                        {itm.status}
                      </span>
                    </div></td>
                  </tr>

                })
                }

              </tbody>
            </table> */}



          </div>
        </div>


      </Layout>
    </div>
  )
}
