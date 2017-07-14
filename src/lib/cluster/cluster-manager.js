/**
 * @author Vinicius Figueiredo <vinifig@hotmail.com>
 */

import Cluster from './cluster';

class ClusterManager {
  constructor (socket) {
    this.clusters = [];
  }

  execute (message) {
    let promises = this.clusters.map((cluster)=>{
      return cluster.execute(message).promise;
    })
    return Promise.all(promises);
  }

  register (path) {
    let cluster = new Cluster (path);
    this.clusters.push(cluster);
  }
}
export default ClusterManager;
