import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import UserPageContainer from '../components/user-page/user-page';
import { useEffect, useState } from 'react';
import userService from '../utils/api/services/user.service';
import { UserInfoDto } from '../utils/api/dto/user.dto';

export const Route = createFileRoute(`/user/$userId`)({
  component: RouteComponent,
});

const route = getRouteApi(`/user/$userId`);

function RouteComponent() {
  const { userId } = route.useParams();
  const [userInfo, setUserInfo] = useState<UserInfoDto | undefined>();
  const [refreshFlag, setRefreshFlag] = useState(false);

  const refreshFiles = () => {
    setRefreshFlag((prev) => !prev);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const updatedUserInfo = await userService.getUserInfo(parseInt(userId));
      setUserInfo(updatedUserInfo);
    };

    getUserInfo();

    const intervalId = setInterval(getUserInfo, 30_000);
    return () => clearInterval(intervalId);
  }, [refreshFlag, userId]);

  return <UserPageContainer onRefresh={refreshFiles} userInfo={userInfo ?? undefined} />;
}
