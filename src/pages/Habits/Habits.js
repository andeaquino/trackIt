import { useContext, useEffect, useState } from "react";
import { getHabits } from "../../services/API";
import UserContext from "../../contexts/UserContext";
import styled from "styled-components";
import Header from "../../shared/Header";
import Menu from "../../shared/Menu";
import CreateBox from "./components/CreateBox";
import Habit from "./components/Habit";

export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [showCreateBox, setShowCreateBox] = useState(false);
  const { user } = useContext(UserContext);

  const cancel = () => {
    setShowCreateBox(false);
  };

  const loadHabits = () => {
    getHabits({ token: user.token }).then((res) => {
      setHabits(res.data);
    });
  };

  useEffect(loadHabits, []);

  return (
    <>
      <Header />
      <HabitsContainer>
        <SectionHeader>
          <h2>Meus Hábitos</h2>
          <button onClick={() => setShowCreateBox(!showCreateBox)}>+</button>
        </SectionHeader>
        <CreateBox
          showCreateBox={showCreateBox}
          cancel={cancel}
          token={user.token}
          loadHabits={loadHabits}
        />
        {habits.length > 0 ? (
          habits.map((habit) => (
            <Habit key={habit.id} habit={habit} loadHabits={loadHabits} />
          ))
        ) : (
          <p>
            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
            começar a trackear!
          </p>
        )}
      </HabitsContainer>
      <Menu />
    </>
  );
}

const HabitsContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #f2f2f2;
  padding: 70px 0 100px;

  p {
    color: #666666;
    font-size: 18px;
    padding: 0 15px;
  }
`;

const SectionHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px 15px;

  h2 {
    color: #126ba5;
    font-size: 23px;
    font-weight: 400;
  }

  button {
    width: 40px;
    height: 35px;
    line-height: 25px;
    background-color: #52b6ff;
    color: #ffffff;
    font-size: 27px;
    border: none;
    border-radius: 5px;
  }
`;
