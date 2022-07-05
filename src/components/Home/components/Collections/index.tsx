import styles from "./index.module.css";
import useLink from "../../../../hooks/useLink";
import { useEffect, useState } from "react";
import axios from "axios";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import dateFormat from 'dateformat';
import { proxy1 } from "../../../../config/abi/common";

const Collection = () => {
  const [topCollections, setTopCollections] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    axios.post(proxy1+'/api/getCollectionById', {
      params: {}
    }).then((resp) => {
      setTopCollections(resp.data)
    }).catch((e) => {
      notification.error({
        message: "Error",
        description: "Some error catched on fetching collection information!!"
      })
    });
  }, [])
  return (
    <div className={styles.collection + "  mt-4"}>
      <div className={styles.temp} >
      <p className={styles.title +" lg:!text-4xl dark:text-white"}>Collections</p>
      <a className={styles.button + " "}>
        <button className="primaryBtn lg:!text-xl dark:bg-none dark:bg-gray-800 dark:hover:bg-gray-900" onClick={()=>{navigate("/collections")}}>More Collections</button>
      </a>
      </div>
      <div className={styles.content}>
        {topCollections.map((each, idx) => (idx<15 && <a key={idx} className={styles.container} href = {(each.creator ? "/exploreCollection":"/explore") + "?collectionid=" + each?.id}
         >
          <div>
          <p className="dark:text-white">{idx + 1}
          </p>
          <div className={styles.nft}>
          <img
              className={styles.logo+" bg-white"}
              src={each.logoURL}
            />
            <div className={styles.name}>
              <p className={styles.id +" dark:text-white overflow-hidden"}>{each.title}</p>
              <div className={styles.eth}>
                <p>{each.category}</p>
                <p></p>
              </div>
            </div>
          </div>
          </div>
          <div className={styles.price}>
            {/* <p className={each.percent * 1 > 0 ? styles.green: styles.red}>{each.percent*1 > 0 ? "+" + (each.percent *1):(each.percent*1)}%</p> */}
            <p className={styles.green + " min-w-[100px]"}>{dateFormat(each.createdAt, "mmm d, yyyy")}</p>
            <div className={styles.priceETH}>
              <p>{Number(each?.totalSupply?.hex?each?.totalSupply?.hex:0)}</p>
            </div>
          </div>
        </a>))}
      </div>
    </div>
  );
};

export default Collection;
