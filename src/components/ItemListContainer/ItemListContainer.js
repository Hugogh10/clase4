import { useState, useEffect } from "react"
import ItemList from '../ItemList/ItemList'
import { useParams } from "react-router-dom"
import { getDocs, collection, query, where} from 'firebase/firestore'
import { db } from '../../services/firebase/firebaseConfig'

const ItemListContainer = ({ greeting }) => {
    const [items, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const {categoryId} = useParams()

    useEffect(()=> {
        setLoading(true)

        const collectionRef = categoryId 
        
        ? query(collection(db, 'items'), where ('category', '==', categoryId)) 
        : collection(db, 'items')

        getDocs(collectionRef)
        .then(response => {
            const productsAdapted = response.docs.map(doc =>{
                const data = doc.data()
                return {id: doc.id, ...data} 
            })
            setProducts(productsAdapted)
        })

        .catch(error => {
            console.error(error)
        })
        .finally(() =>{
            setLoading(false)
        })
    
    }, [categoryId]);


    return (
      <div className="">
        <div>
          <h1 className="titulo bounce-in-bck">{greeting}</h1>
        </div>
        {loading ? (
          <div className="Loading">Cargando productos...</div>
        ) : (
          <div className="ItemListContainer">
            <ItemList products={items} />
          </div>
        )}
      </div>
    );
  };
  
  export default ItemListContainer;