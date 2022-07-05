import styles from "./index.module.css";

const Categories = () => {
  const data = require("../../../../config/constants/datamodel/ExploreMenuData.json")
  return (
    <div className={styles.container}>
      <p className={styles.categories + " lg:!text-4xl dark:text-white"}>Browse by category</p>
      <div className={styles.content}>
        {data.map((each,key) => (<a key={key} className={styles.category} href = {"/collections?category=" + each.label}>
          <img src={each.bannerURL} />
          <div className={styles.word +" dark:bg-gray-600 dark:border-none"}>
            <p className = "text-xl dark:text-white">{each.label}</p>
          </div>
        </a>))}
      </div>
    </div>
  );
};

export default Categories;
