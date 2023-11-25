
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../components/global/layout'

export default function Resellerdashboard() {

  useEffect(() => {
    Highcharts.chart("container", {
      chart: {
        type: "spline",
        inverted: true,
      },
      title: {
        text: "Atmosphere Temperature by Altitude",
        align: "left",
      },
      subtitle: {
        text: "According to the Standard Atmosphere Model",
        align: "left",
      },
      xAxis: {
        reversed: false,
        title: {
          enabled: true,
          text: "Altitude",
        },
        labels: {
          format: "{value} km",
        },
        accessibility: {
          rangeDescription: "Range: 0 to 80 km.",
        },
        maxPadding: 0.05,
        showLastLabel: true,
      },
      yAxis: {
        title: {
          text: "Temperature",
        },
        labels: {
          format: "{value}°",
        },
        accessibility: {
          rangeDescription: "Range: -90°C to 20°C.",
        },
        lineWidth: 1,
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        headerFormat: "<b>{series.name}</b><br/>",
        pointFormat: "{point.x} km: {point.y}°C",
      },
      plotOptions: {
        spline: {
          marker: {
            enable: false,
          },
        },
      },
      series: [
        {
          name: "Temperature",
          data: [
            [0, 15],
            [10, -50],
            [20, -56.5],
            [30, -46.5],
            [40, -22.1],
            [50, -2.5],
            [60, -27.7],
            [70, -55.7],
            [80, -76.5],
          ],
        },
      ],
    });

    // second chart

    const colors = Highcharts.getOptions().colors,
      categories = [
        'Other'
      ],
      data = [
        {
          y: 61.04,
          color: colors[1],
          drilldown: {
            name: 'Other',
            categories: [
              'Other v97.0',
              'Other v96.0',
              'Other v95.0',
              'Other v94.0',
              'Other v93.0',
              'Other v92.0',
              'Other v91.0',
              'Other v90.0',
              'Other v89.0',
              'Other v88.0',
              'Other v87.0',
              'Other v86.0',
              'Other v85.0',
              'Other v84.0',
              'Other v83.0',
              'Other v81.0',
              'Other v89.0',
              'Other v79.0',
              'Other v78.0',
              'Other v76.0',
              'Other v75.0',
              'Other v72.0',
              'Other v70.0',
              'Other v69.0',
              'Other v56.0',
              'Other v49.0'
            ],
            data: [
              36.89,
              18.16,
              0.54,
              0.7,
              0.8,
              0.41,
              0.31,
              0.13,
              0.14,
              0.1,
              0.35,
              0.17,
              0.18,
              0.17,
              0.21,
              0.1,
              0.16,
              0.43,
              0.11,
              0.16,
              0.15,
              0.14,
              0.11,
              0.13,
              0.12
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
        text: 'Browser market share, January, 2022',
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
        name: 'Browsers',
        data: browserData,
        size: '60%',
        dataLabels: {
          color: '#ffffff',
          distance: -30
        }
      }, {
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



  return (
    <div>
        <div className='conatiner'>
          <div className="row">
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-3 mt-3">
              <div className="sales_section">
                <div className="main_sales">
                  <div className="sales_headings">
                    <div>
                      <p className="sub_heading">New Sales</p>
                    </div>
                    <div>
                      <img src="/assets/img/bag.png" className="wallets_img" />
                    </div>
                  </div>
                  <div className="sales_icons">
                    <h3 className="Amount_sales">$ 22,880.50</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-3 mt-3">
              <div className="sales_section">
                <div className="main_sales">
                  <div className="sales_headings">
                    <div>
                      <p className="sub_heading">Cost of Goods Sold</p>
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
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-3 mt-3">
              <div className="sales_section">
                <div className="main_sales">
                  <div className="sales_headings">
                    <div>
                      <p className="sub_heading">Gross Profit</p>
                    </div>
                    <div>
                      <img
                        src="/assets/img/graphrange.png"
                        className="wallets_img"
                      />
                    </div>
                  </div>
                  <div className="sales_icons">
                    <h3 className="Amount_sales">$ 2,768.00</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-3 mt-3">
              <div className="sales_section">
                <div className="main_sales">
                  <div className="sales_headings">
                    <div>
                      <p className="sub_heading">Total Orders</p>
                    </div>
                    <div>
                      <img src="/assets/img/send.png" className="wallets_img" />
                    </div>
                  </div>
                  <div className="sales_icons">
                    <h3 className="Amount_sales">6</h3>
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

            {/* second chat */}
            <div className="col-md-6 mt-4">
              <div className="shadow p-3 bg-white">
                <figure class="highcharts-figure">
                  <div id="barChart"></div>
                </figure>
              </div>
            </div>
          </div>
          <div className="table-responsive table_section">
          </div>
        </div>
    </div>
  )
}
