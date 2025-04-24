import styles from "./share-list.module.css";
import {Unplug} from "lucide-react";
import userService from "../../../utils/api/services/user.service";
import {useRouter} from "@tanstack/react-router";

export default function ShareList() {
    const router = useRouter();
    return <div className={styles.sharedListContainer}>
        <div className={styles.titleDiv}>
            <h3>USERS</h3>
            <button className={styles.disconnectButton} onClick={() => {
                userService.logout();
                router.navigate({to: '/auth'});
            }}><Unplug/></button>
        </div>
        <div className={styles.usersListDiv}>
            <p>juju</p>
            <p>juju</p>
            <p>juju</p>
            <p>juju</p>
            <p>juju</p>
            <p>juju</p>
            <p>juju</p>
            <p>juju</p>
            <p>juju</p>
            <p>juju</p>
            <p>juju</p>
            <p>juju</p>
            <p>juju</p>
            <p>juju</p>
            <p>juju</p>
            <p>juju</p>
            <p>juju</p>
            <p>juju</p>
            <p>juju</p>
            <p>juju</p>
            <p>juju</p>
            <p>juju</p>
            <p>juju</p>
            <p>juju</p>
            <p>juju</p>
            <p>juju</p>
            <p>juju</p>
            <p>juju</p>
            <p>juju</p>
            <p>juju</p>
            <p>juju</p>
            <p>juju</p>
        </div>
    </div>
}