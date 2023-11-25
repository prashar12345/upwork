import React, { useState, useEffect } from 'react';
import Layout from '../../components/global/layout';
import './style.scss'


const Customers = () => {
  useEffect(() => {
  Highcharts.chart('container', {
    chart: {
        type: 'spline'
    },
    title: {
        text: 'Segments'
    },
    subtitle: {
        text: 'Source: ' +
            '<a href="https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature" ' +
            'target="_blank">Wikipedia.com</a>'
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        accessibility: {
            description: 'Months of the year'
        }
    },
    yAxis: {
        title: {
            text: 'Temperature'
        },
        labels: {
            format: '{value}°'
        }
    },
    tooltip: {
        crosshairs: true,
        shared: true
    },
    plotOptions: {
        spline: {
            marker: {
                radius: 4,
                lineColor: '#666666',
                lineWidth: 1
            }
        }
    },
    series: [{
        name: 'Tokyo',
        marker: {
            symbol: 'square'
        },
        data: [5.2, 5.7, 8.7, 13.9, 18.2, 21.4, 25.0, {
            y: 26.4,
            marker: {
                symbol: 'url(https://www.highcharts.com/samples/graphics/sun.png)'
            },
            accessibility: {
                description: 'Sunny symbol, this is the warmest point in the chart.'
            }
        }, 22.8, 17.5, 12.1, 7.6]

    }, {
        name: 'Bergen',
        marker: {
            symbol: 'diamond'
        },
        data: [{
            y: 1.5,
            marker: {
                symbol: 'url(https://www.highcharts.com/samples/graphics/snow.png)'
            },
            accessibility: {
                description: 'Snowy symbol, this is the coldest point in the chart.'
            }
        }, 1.6, 3.3, 5.9, 10.5, 13.5, 14.5, 14.4, 11.5, 8.7, 4.7, 2.6]
    }]
});

Highcharts.chart('barsChart', {
  chart: {
      type: 'bar'
  },
  title: {
      text: 'UEFA CL top scorers by season'
  },
  xAxis: {
      categories: ['2020/21', '2019/20', '2018/19', '2017/18', '2016/17']
  },
  yAxis: {
      min: 0,
      title: {
          text: 'Goals'
      }
  },
  legend: {
      reversed: true
  },
  plotOptions: {
      series: {
          stacking: 'normal',
          dataLabels: {
              enabled: true
          }
      }
  },
  series: [{
      name: 'Cristiano Ronaldo',
      data: [4, 4, 6, 15, 12]
  }, {
      name: 'Lionel Messi',
      data: [5, 3, 12, 6, 11]
  }, {
      name: 'Robert Lewandowski',
      data: [5, 15, 8, 5, 8]
  }]
});
Highcharts.chart('pie', {
  chart: {
      type: 'variablepie'
  },
  title: {
      text: 'Countries oforigin',
      align: 'left'
  },
  tooltip: {
      headerFormat: '',
      pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
          'Area (square km): <b>{point.y}</b><br/>' +
          'Population density (people per square km): <b>{point.z}</b><br/>'
  },
  series: [{
      minPointSize: 10,
      innerSize: '20%',
      zMin: 0,
      name: 'countries',
      borderRadius: 5,
      data: [{
          name: 'Spain',
          y: 505992,
          z: 92
      }, {
          name: 'France',
          y: 551695,
          z: 119
      }, {
          name: 'Poland',
          y: 312679,
          z: 121
      }, {
          name: 'Czech Republic',
          y: 78865,
          z: 136
      }, {
          name: 'Italy',
          y: 301336,
          z: 200
      }, {
          name: 'Switzerland',
          y: 41284,
          z: 213
      }, {
          name: 'Germany',
          y: 357114,
          z: 235
      }],
      colors: [
          '#4caefe',
          '#3dc3e8',
          '#2dd9db',
          '#1feeaf',
          '#0ff3a0',
          '#00e887',
          '#23e274'
      ]
  }]
});
  })
  

  return (
    <Layout> 
        <div className="container-fluid"> 
           <div className='d-flex justify-content-between border-bottom pb-3'>
           <h3 className='hedding '>Customers</h3> 
           </div>
            <div className='row mt-3'>
              <div className='col-12 col-sm-12 col-md-12 col-lg-8'>
                <div className='shadow bg-white p-3 roundedBorder'>
                <figure class="highcharts-figure">
                 <div id="container"></div> 
                </figure>
                </div>
                <div className='shadow bg-white p-3 mt-4 mb-3 roundedBorder'>
                <figure class="highcharts-figure">
                <div id="barsChart"></div> 
                </figure>
              </div>
              </div>
              <div className='col-12 col-sm-12 col-md-12 col-lg-4'>
                <div className='row'>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6'>
                  <div className='shadow bg-white p-3 text-center roundedBorder'>
                <h5>Domestic</h5>
                <h4 className='font-weight-bold text-primary'>15%</h4>
                </div>
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 '>
                  <div className='shadow bg-white p-3 text-center roundedBorder repeat'>
                <h5>Repeated</h5>
                <h4 className='font-weight-bold text-primary'>5%</h4>
                </div>
                  </div>

                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6  mt-3'>
                  <div className='shadow bg-white p-3 text-center roundedBorder repeat'>
                <h5>Total served</h5>
                <h4 className='font-weight-bold text-primary'>15,365</h4>
                </div>
                  </div> 
                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6  mt-3'>
                  <div className='shadow bg-white p-3 text-center roundedBorder repeat'>
                <h5>Families</h5>
                <h4 className='font-weight-bold text-primary'>26%</h4>
                </div>
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6  mt-3'>
                  <div className='shadow bg-white p-3 text-center roundedBorder repeat'>
                <h5>Solo travellers</h5>
                <h4 className='font-weight-bold text-primary'>15%</h4>
                </div>
                  </div>
                  <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6  mt-3'>
                  <div className='shadow bg-white p-3 text-center roundedBorder repeat'>
                <h5>Average group size</h5>
                <h4 className='font-weight-bold text-primary'>2.6</h4>
                </div>
                  </div>
                 <div className='col-md-12 mt-3'>
                 <div className='shadow bg-white p-3 text-center roundedBorder mt-3'>
                 <figure class="highcharts-figure">
                  <div id="pie"></div> 
                </figure>
                </div>
                 </div>
                </div>
             
              </div>
            </div>

        </div>
    </Layout>
  );
};

export default Customers;
