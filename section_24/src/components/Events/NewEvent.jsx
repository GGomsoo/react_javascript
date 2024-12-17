import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createNewEvent } from "../../util/http.js";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { queryClient } from '../../util/http.js';
export default function NewEvent() {
  const navigate = useNavigate();

  // mutate 함수를 호출하여 요청을 전송한다
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent,
    onSuccess: () => {
      navigate("/events");
      // 변형이 성공됐을 때
      // 현재 화면에 표시된 컴포넌트와 관련된 쿼리가 실행된 경우
      // 특정 쿼리로 가져온 데이터가 오래됬으니 만료로 표시
      // 즉시 다시 가져오라고 쿼리에 알린다

      // queryKey 가 포함된 쿼리는 무효화된다.
      // exact 옵션을 사용하면, queryKey 가 정확히 일치하는 쿼리만 무효화된다.
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  function handleSubmit(formData) {
    mutate({ event: formData });
  }

  return (
    <Modal onClose={() => navigate("../")}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && <p>Creating event...</p>}
        {!isPending && (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Create
            </button>
          </>
        )}
      </EventForm>
      {isError && (
        <ErrorBlock
          title="Failed to create event"
          message={error.info?.message || "Failed to create event"}
        />
      )}
    </Modal>
  );
}
