/**
 * @author Vinicius Figueiredo <vinifig@hotmail.com>
 */

import Cluster from './cluster';

class ClusterManager {
  constructor () {
    this.clusters = [];
  }

  execute () {
    let promises = this.clusters.map((cluster)=>{
      return cluster.execute().promise;
    })
    return Promise.all(promises);
  }

  register (path, message) {
    let cluster = new Cluster (path, message);
    this.clusters.push(cluster);
  }
}
export default ClusterManager;
